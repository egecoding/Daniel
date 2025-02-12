import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from '@config';
import { translate } from '@i18n';
import { getClientCountry } from '@storage';
import Modal from '@components/common/modal';
import { setShouldReloadWorkspace } from '@redux-store/ui-slice.js';
import { observer as globalObserver } from '@utilities/observer';
import useLogout from '../../common/hooks/useLogout.js';
import AccountSwitchModal from './account-switch-modal.jsx';
import RiskComponent from './risk-component.jsx';
import TabContent from './tab-content.jsx';
import AccountWalletDropdown from './WalletAccountSwitcher/account-wallet-dropdown.jsx';

const Separator = () => <div className='account__switcher-seperator'></div>;
const getTotalDemo = accounts => {
    if (!accounts) return 0;
    const demo_account = Object.values(accounts).find(acc => acc.demo_account && acc.type === 'deriv');
    const total = demo_account?.balance || 0;
    return total.toLocaleString(undefined, {
        minimumFractionDigits: config.currency_name_map[total]?.fractional_digits ?? 2,
    });
};

const low_risk_countries = ['za', 'ec', 'bw'];

const AccountDropdown = React.forwardRef((props, dropdownRef) => {
    const { setIsAccDropdownOpen, virtual } = props;
    const [activeTab, setActiveTab] = React.useState(virtual ? 'demo' : 'real');
    const [show_logout_modal, updaetShowLogoutModal] = React.useState(false);
    const { accounts, balance, currency, account_type, has_wallet_account } = useSelector(state => state.client);

    const { low_risk_without_account = false, high_risk_without_account = false } = account_type;
    const is_country_low_risk = low_risk_countries.includes(getClientCountry());
    const { is_bot_running, show_bot_unavailable_page } = useSelector(state => state.ui);
    const { url } = config.add_account;
    const container_ref = React.useRef();
    const dispatch = useDispatch();
    const location = useLocation();
    const logout = useLogout();

    const virtual_accounts = [];
    const eu_accounts = [];
    const non_eu_accounts = [];
    Object.keys(accounts).forEach(account => {
        if (account.startsWith('VR')) virtual_accounts.push({ ...accounts[account], account });
        if (account.startsWith('MF')) eu_accounts.push({ ...accounts[account], account });
        if (account.startsWith('CR')) non_eu_accounts.push({ ...accounts[account], account });
    });
    const real_account = [...non_eu_accounts, ...eu_accounts];
    const is_eu_country = globalObserver.getState('is_eu_country');
    const is_demo = activeTab === 'demo';
    const is_real = activeTab === 'real';
    const has_no_account = low_risk_without_account || high_risk_without_account;

    React.useEffect(() => {
        function handleClickOutside(event) {
            if (container_ref.current && !container_ref?.current?.contains(event.target)) {
                setIsAccDropdownOpen(false);
            }
        }
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    const onLogout = () => {
        if (location.pathname.includes('endpoint')) {
            logout();
        } else {
            globalObserver.emit('ui.logout');
        }
        dispatch(setShouldReloadWorkspace(true));
    };

    const shouldShowNoAcc = () => (
        <RiskComponent
            eu_accounts={eu_accounts}
            non_eu_accounts={non_eu_accounts}
            is_country_low_risk={is_country_low_risk}
        />
    );

    const shouldShowRealAcc = ({ title = 'Deriv accounts', acc = real_account }) => (
        <TabContent
            tab='real'
            isActive={is_real}
            setIsAccDropdownOpen={setIsAccDropdownOpen}
            accounts={acc}
            title={title}
        />
    );

    return (
        <div className='account__switcher-dropdown-wrapper show' ref={dropdownRef}>
            <div id='account__switcher-dropdown' className='account__switcher-dropdown' ref={container_ref}>
                <div className='account__switcher-container'>
                    <ul className='account__switcher-tabs'>
                        <li
                            className={`account__switcher-tab ${is_real ? 'ui-tabs-active' : ''}`}
                            onClick={() => setActiveTab('real')}
                        >
                            <a>{translate('Real')}</a>
                        </li>
                        <li
                            className={`account__switcher-tab ${is_real ? '' : 'ui-tabs-active'}`}
                            onClick={() => setActiveTab('demo')}
                        >
                            <a>{translate('Demo')}</a>
                        </li>
                    </ul>
                    {/* country low risk and does not have both accounts */}
                    {is_real && is_country_low_risk && !real_account.length ? shouldShowNoAcc() : null}
                    {/* country is eu and no account */}
                    {is_real && !is_country_low_risk && is_eu_country && !eu_accounts.length ? shouldShowNoAcc() : null}
                    {/* country is non eu and no account */}
                    {is_real && !is_country_low_risk && !is_eu_country && !non_eu_accounts.length
                        ? shouldShowNoAcc()
                        : null}
                    {/* only real eu account */}
                    {is_real && is_country_low_risk && eu_accounts.length && !non_eu_accounts.length ? (
                        <>
                            {shouldShowNoAcc()}
                            <Separator />
                            {shouldShowRealAcc({ title: 'Eu Deriv account' })}
                        </>
                    ) : null}

                    {
                        /* only for non eu accounts */
                        is_real && is_country_low_risk && non_eu_accounts.length && !eu_accounts.length ? (
                            <>
                                {shouldShowRealAcc({ title: 'Non-Eu Deriv accounts' })}
                                <Separator />
                                {shouldShowNoAcc()}
                            </>
                        ) : null
                    }
                    {/* country should have both real and non eu accounts */}
                    {is_real && is_country_low_risk && eu_accounts.length && non_eu_accounts.length ? (
                        <>
                            {shouldShowRealAcc({ title: 'Non-Eu Deriv accounts', acc: non_eu_accounts })}
                            <Separator />
                            {shouldShowRealAcc({ title: 'Eu Deriv account', acc: eu_accounts })}
                        </>
                    ) : null}
                    {/* should show real accounts */}
                    {is_real && !is_country_low_risk ? shouldShowRealAcc({ title: 'Deriv Accounts' }) : null}
                    <TabContent
                        tab='demo'
                        isActive={is_demo}
                        setIsAccDropdownOpen={setIsAccDropdownOpen}
                        accounts={virtual_accounts}
                    />
                </div>
                <Separator />
                <div className='account__switcher-total'>
                    
                    
                    <div
                        className={classNames('account__switcher-footer', {
                            'account__switcher-footer--demo': is_demo,
                            'account__switcher-footer--real': Object.keys(accounts).length === 1,
                        })}
                    >
                        
                        <div
                            id='deriv__logout-btn'
                            className='account__switcher-logout logout'
                            onClick={() => {
                                if (show_bot_unavailable_page) onLogout();
                                else updaetShowLogoutModal(true);
                            }}
                        >
                            <span className='account__switcher-logout-text'>{translate('Log out')}</span>
                            <img
                                className='account__switcher-logout-icon logout-icon'
                                src='/public/images/ic-logout.svg'
                            />
                        </div>
                    </div>
                </div>
            </div>
            {show_logout_modal && (
                <Modal
                    title={translate('Are you sure?')}
                    class_name='logout'
                    onClose={() => updaetShowLogoutModal(false)}
                >
                    <AccountSwitchModal
                        is_bot_running={is_bot_running}
                        onClose={() => updaetShowLogoutModal(false)}
                        onAccept={onLogout}
                    />
                </Modal>
            )}
        </div>
    );
});

AccountDropdown.displayName = 'AccountDropdown';

AccountDropdown.propTypes = {
    setIsAccDropdownOpen: PropTypes.func,
    virtual: PropTypes.bool,
};

export default AccountDropdown;

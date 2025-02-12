import React from 'react';
import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
import {
    getLanguage,
    isLoggedIn,
    getAppIdFallback,
    getDefaultEndpoint,
    getServerAddressFallback,
    getConfigAppID,
    setConfigAppID,
    getConfigURL,
    setConfigURL,
} from '@storage';
import { translate } from '@i18n';
import useLogout from '../../common/hooks/useLogout';
import './endpoint.scss';

const getError = server => (
    <React.Fragment>
        Unable to connect to <b>{server}</b>. Switching connection to default endpoint.
    </React.Fragment>
);

let api; // to close the error connection
const Endpoint = () => {
    const [server, setServer] = React.useState('frontend.derivws.com');
    const [app_id, setAppId] = React.useState('');
    const [has_error, setError] = React.useState('');
    const [is_connected, setConnected] = React.useState(false);
    const logout = useLogout();

    React.useEffect(() => {
        $('.barspinner').hide();
        setServer(getConfigURL() || getDefaultEndpoint().url);
        setAppId(getConfigAppID() || getDefaultEndpoint().appId);
    }, []);

    const checkConnection = async (appId, apiUrl) => {
        try {
            if (api?.disconnect) {
                api.disconnect();
            }

            const socket_url = `wss://${apiUrl || getServerAddressFallback()}/websockets/v3?app_id=${
                appId || getAppIdFallback()
            }&l=${getLanguage().toUpperCase()}&brand=deriv`;

            api = new DerivAPIBasic({
                connection: new WebSocket(socket_url),
            });

            api.onOpen().subscribe(() => {
                setConnected(true);
            });

            api.onClose().subscribe(() => {
                setError(getError(apiUrl));
                resetEndpoint();
            });
        } catch (e) {
            setError(getError(apiUrl));
            resetEndpoint();
            checkConnection(getDefaultEndpoint().appId, getDefaultEndpoint().url);
        }
    };

    const onSubmit = e => {
        setError('');
        setConnected(false);
        e.preventDefault();

        if (server === getConfigURL() && app_id === getConfigAppID()) return;

        setConfigURL(server);
        setConfigAppID(app_id);

        const urlReg = /^(?:http(s)?:\/\/)?[\w.-]+(?:.[\w.-]+)+[\w-._~:?#[\]@!$&'()*+,;=.]+$/;

        if (!urlReg.test(server)) {
            setError(translate('Please enter a valid server URL'));
            return;
        }

        checkConnection(app_id, server.trim());
        if (isLoggedIn()) {
            logout();
        }
    };

    const resetEndpoint = () => {
        setAppId(getDefaultEndpoint().appId);
        setServer(getDefaultEndpoint().url);
        setConfigAppID(getDefaultEndpoint().appId);
        setConfigURL(getDefaultEndpoint().url);
    };

    const onReset = e => {
        e.preventDefault();
        setError('');
        resetEndpoint();
    };

    return (
        <div className='endpoint'>
            <h1>Change API Endpoint</h1>
            <div className='endpoint__form-container'>
                <form>
                    <table id='details' style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td>
                                    <p>Server</p>
                                </td>
                                <td>
                                    <input
                                        type='text'
                                        id='server_url'
                                        value={server}
                                        maxLength='30'
                                        onChange={e => setServer(e.target.value)}
                                    />
                                    <p className='hint no-margin'>e.g. frontend.derivws.com</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>OAuth App ID</p>
                                </td>
                                <td>
                                    <input
                                        type='text'
                                        id='app_id'
                                        value={app_id}
                                        maxLength='5'
                                        onChange={e => setAppId(e.target.value)}
                                    />
                                    <p>
                                        You have to register and get App ID before you can use different OAuth server
                                        for authentication. For more information refer to OAuth details on{' '}
                                        <a href='https://developers.binary.com/' target='_blank' rel='noreferrer'>
                                            https://developers.binary.com
                                        </a>
                                    </p>
                                    {has_error && (
                                        <p id='error' className='error'>
                                            {has_error}
                                        </p>
                                    )}
                                    {is_connected && (
                                        <p id='connected'>
                                            Connected to the Endpoint <b>{getConfigURL()}!</b>
                                        </p>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button className='button' id='new_endpoint' type='submit' onClick={onSubmit}>
                                        Submit
                                    </button>
                                </td>
                                <td>
                                    <button className='button' id='reset' onClick={onReset}>
                                        Reset To Original Settings
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default Endpoint;

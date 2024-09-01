import React from 'react';
import { useSelector } from 'react-redux';

const styles = {
    closeButtonContainer: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: '999',
    },
    closeButton: {
        cursor: 'pointer',
    },
    beaconContainer: {
        position: 'relative',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '0px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    mainContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },
    flexContainer: {
        width: '100%',
        height: '100%',
    },
    flexRow: {
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        width: '100%',
    },
    spacer: {
        width: '20px',
        height: '20px',
    },
    contentContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        height: '18rem',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    linksContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '0.5rem 0',
    },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0 1rem 0 0',
        borderRadius: '4px',
        textDecoration: 'none',
        color: 'inherit',
    },
    linkContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    iconContainer: {
        backgroundColor: '#f0f0f0',
        padding: '0.5rem',
        borderRadius: '4px',
        display: 'flex',
    },
    linkTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    linkText: {
        fontSize: '1rem',
    },
    footerText: {
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    },
    pagination: {
        position: 'absolute',
        bottom: '1rem',
        left: '0',
        right: '0',
    },
    paginationDots: {
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationDot: (isActive) => ({
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: isActive ? '#007bff' : '#ccc',
    }),
};

const CloseButton = ({ onClick }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='23'
        height='23'
        viewBox='0 0 24 24'
        fill='none'
        stroke='#000'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
        onClick={onClick}
        style={styles.closeButton}
    >
        <line x1='18' y1='6' x2='6' y2='18'></line>
        <line x1='6' y1='6' x2='18' y2='18'></line>
    </svg>
);

const CustomBeaconComponent = ({ closeTourPermanently, continueTour }) => (
    <>
        <div style={styles.closeButtonContainer}>
            <CloseButton onClick={closeTourPermanently} />
        </div>
        <div style={styles.beaconContainer}>
            <div style={styles.mainContainer}>
                <div style={styles.flexContainer}>
                    <div style={styles.flexRow}>
                        <div style={styles.contentContainer}>
                            <div>
                                <div style={styles.title}>
                                        Features Available on the Platform
                                </div>
                            </div>
                            <div>
                                <div style={styles.linksContainer}>
                                    <div style={styles.linkContent}>
                                        <div style={styles.iconContainer}>
                                            <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 24 24' className='text-xl' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
                                                <path fill='none' d='M0 0h24v24H0z'></path>
                                                <path d='M22 5v2h-3v3h-2V7h-3V5h3V2h2v3h3zm-3 14H5V5h6V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6h-2v6zm-4-6v4h2v-4h-2zm-4 4h2V9h-2v8zm-2 0v-6H7v6h2z'></path>
                                            </svg>
                                        </div>
                                        <div style={styles.linkTextContainer}>
                                            <div style={styles.linkText}>Free Analysis Tool</div>
                                        </div>
                                    </div>
                                    <div style={styles.linkContent}>
                                        <div style={styles.iconContainer}>
                                            <svg width="1em" height="1em" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 8.5C5 8.22386 5.22386 8 5.5 8C5.77614 8 6 8.22386 6 8.5C6 8.77614 5.77614 9 5.5 9C5.22386 9 5 8.77614 5 8.5Z" fill="#000000"/>
                                                <path d="M9 8.5C9 8.22386 9.22386 8 9.5 8C9.77614 8 10 8.22386 10 8.5C10 8.77614 9.77614 9 9.5 9C9.22386 9 9 8.77614 9 8.5Z" fill="#000000"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8 2.02242C10.8033 2.27504 13 4.63098 13 7.5V13.5C13 14.3284 12.3284 15 11.5 15H3.5C2.67157 15 2 14.3284 2 13.5V7.5C2 4.63098 4.19675 2.27504 7 2.02242V0H8V2.02242ZM5.5 7C4.67157 7 4 7.67157 4 8.5C4 9.32843 4.67157 10 5.5 10C6.32843 10 7 9.32843 7 8.5C7 7.67157 6.32843 7 5.5 7ZM9.5 7C8.67157 7 8 7.67157 8 8.5C8 9.32843 8.67157 10 9.5 10C10.3284 10 11 9.32843 11 8.5C11 7.67157 10.3284 7 9.5 7ZM11 12H4V11H11V12Z" fill="#000000"/>
                                                <path d="M0 8V12H1V8H0Z" fill="#000000"/>
                                                <path d="M15 8H14V12H15V8Z" fill="#000000"/>
                                            </svg>
                                        </div>
                                        <div style={styles.linkTextContainer}>
                                            <div style={styles.linkText}>Free AI Robot</div>
                                        </div>
                                    </div>
                                    <div style={styles.linkContent}>
                                        <div style={styles.iconContainer}>
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M17.41 6.59L15 5.5l2.41-1.09L18.5 2l1.09 2.41L22 5.5l-2.41 1.09L18.5 9l-1.09-2.41zm3.87 6.13L20.5 11l-.78 1.72-1.72.78 1.72.78.78 1.72.78-1.72L23 13.5l-1.72-.78zm-5.04 1.65l1.94 1.47-2.5 4.33-2.24-.94c-.2.13-.42.26-.64.37l-.3 2.4h-5l-.3-2.41c-.22-.11-.43-.23-.64-.37l-2.24.94-2.5-4.33 1.94-1.47c-.01-.11-.01-.24-.01-.36s0-.25.01-.37l-1.94-1.47 2.5-4.33 2.24.94c.2-.13.42-.26.64-.37L7.5 6h5l.3 2.41c.22.11.43.23.64.37l2.24-.94 2.5 4.33-1.94 1.47c.01.12.01.24.01.37s0 .24-.01.36zM13 14c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3z"></path></svg>
                                        </div>
                                        <div style={styles.linkTextContainer}>
                                            <div style={styles.linkText}>More Customized Blocks</div>
                                        </div>
                                    </div>
                                    <a target='_blank' style={styles.link} href='https://t.me/automatedbinarybots' rel="noreferrer">
                                        <div style={styles.linkContent}>
                                            <div style={styles.iconContainer}>
                                                <svg width="1em" height="1em" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7225)"/>
                                                    <path d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z" fill="white"/>
                                                    <defs>
                                                        <linearGradient id="paint0_linear_87_7225" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                                                            <stop stopColor="#37BBFE"/>
                                                            <stop offset="1" stopColor="#007DBB"/>
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div style={styles.linkTextContainer}>
                                                <div style={styles.linkText}>Join our Telegram Group</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div style={styles.footerText}>Our mission is to provide cutting edge tools to simplify your Deriv Binary Trading</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);

CustomBeaconComponent.propTypes = {
    closeTourPermanently: () => {},
    continueTour: () => {},
};

function Welcome(closeTourPermanently, continueTour) {
    const { is_logged } = useSelector(state => state.client);

    const steps = [
        {
            content: (
                <CustomBeaconComponent
                    closeTourPermanently={closeTourPermanently}
                    continueTour={continueTour}
                />
            ),
            target: '#first-step-target',
            placement: 'center',
            offset: 200,
            disableBeacon: true,
            hideCloseButton: true,
            styles: {
                buttonNext: {
                    display: 'none',
                },
                tooltipContent: {
                    textAlign: 'center',
                },
                tooltipTitle: {
                    textAlign: 'center',
                },
            },
        },
    ];

    return steps;
}

Welcome.propTypes = {
    closeTourPermanently: () => {},
    continueTour: () => {},
};

export default Welcome;





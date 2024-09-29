import React, { useEffect, Fragment } from "react";

const Meeting = ({ payload }) => {
    useEffect(() => {
        let isMounted = true; // Track if the component is mounted

        const initializeZoom = async () => {
            try {
                const { ZoomMtg } = await import("@zoomus/websdk");

                ZoomMtg.setZoomJSLib('https://source.zoom.us/lib', 'av');
                ZoomMtg.prepareWebSDK();

                if (isMounted) { // Only proceed if the component is still mounted
                    ZoomMtg.generateSDKSignature({
                        meetingNumber: payload.meetingNumber,
                        role: payload.role,
                        sdkKey: payload.sdkKey,
                        sdkSecret: payload.sdkSecret,
                        success: function (signature) {
                            if (isMounted) { // Check before calling init
                                ZoomMtg.init({
                                    leaveUrl: payload.leaveUrl,
                                    success: function () {
                                        if (isMounted) { // Check before calling join
                                            ZoomMtg.join({
                                                meetingNumber: payload.meetingNumber,
                                                signature: signature.result,
                                                sdkKey: payload.sdkKey,
                                                userName: payload.userName,
                                                userEmail: payload.userEmail,
                                                passWord: payload.password,
                                                tk: '',
                                                success: function () {
                                                    console.log('--Joined--');
                                                },
                                                error: function (error) {
                                                    console.error("Join Error:", error);
                                                }
                                            });
                                        }
                                    },
                                    error: function (error) {
                                        console.error("Init Error:", error);
                                    }
                                });
                            }
                        },
                        error: function (error) {
                            console.error("Signature Error:", error);
                        }
                    });
                }
            } catch (error) {
                console.error("Error initializing Zoom SDK:", error);
            }
        };

        initializeZoom();

        return () => {
            isMounted = false; // Mark as unmounted on cleanup
        };
    }, [payload]);

    return (
        <Fragment>
            <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.9.0/css/bootstrap.css" />
            <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.9.0/css/react-select.css" />
        </Fragment>
    );
};

export default Meeting;

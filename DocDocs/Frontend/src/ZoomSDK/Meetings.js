import React, { useEffect, Fragment } from "react";

const Meeting = ({ payload }) => {
    useEffect(() => {
        let isMounted = true;

        const initializeZoom = async () => {
            try {
                const { ZoomMtg } = await import("@zoomus/websdk");

                // Set the Zoom SDK libraries and prepare settings
                ZoomMtg.setZoomJSLib('https://source.zoom.us/lib', 'av');
                ZoomMtg.prepareWebSDK();

                if (isMounted) {
                    ZoomMtg.generateSDKSignature({
                        meetingNumber: payload.meetingNumber,
                        role: payload.role,
                        sdkKey: payload.sdkKey,
                        sdkSecret: payload.sdkSecret,
                        success: function (signature) {
                            console.log('Signature generated:', signature.result);
                            if (isMounted) {
                                ZoomMtg.init({
                                    leaveUrl: payload.leaveUrl,
                                    isSupportAV: true, // Ensure audio/video support
                                    success: function () {
                                        console.log('Zoom SDK initialized successfully');
                                        if (isMounted) {
                                            ZoomMtg.join({
                                                meetingNumber: payload.meetingNumber,
                                                signature: signature.result,
                                                sdkKey: payload.sdkKey,
                                                userName: payload.userName,
                                                userEmail: payload.userEmail,
                                                passWord: payload.password,
                                                success: function () {
                                                    console.log('--Joined meeting successfully--');
                                                },
                                                error: function (error) {
                                                    console.error("Error joining the meeting:", error.message || JSON.stringify(error));
                                                }
                                            });
                                        }
                                    },
                                    error: function (error) {
                                        console.error("Error initializing Zoom SDK:", error.message || JSON.stringify(error));
                                    }
                                });
                            }
                        },
                        error: function (error) {
                            console.error("Error generating SDK signature:", error.message || JSON.stringify(error));
                        }
                    });
                }
            } catch (error) {
                console.error("Error initializing Zoom SDK:", error.message || JSON.stringify(error));
            }
        };

        initializeZoom();

        return () => {
            isMounted = false;
        };
    }, [payload]);

    return (
        <Fragment>
            {/* Including required Zoom Web SDK stylesheets */}
            <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.9.0/css/bootstrap.css" />
            <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.9.0/css/react-select.css" />
        </Fragment>
    );
};

export default Meeting;

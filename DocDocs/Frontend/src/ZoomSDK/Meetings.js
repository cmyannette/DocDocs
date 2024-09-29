import React, { useEffect, Fragment } from "react";

const Meeting = ({ payload }) => {
    useEffect(() => {
        const initializeZoom = async () => {
            const { ZoomMtg } = await import("@zoomus/websdk");
        
            ZoomMtg.setZoomJSLib('https://source.zoom.us/lib', 'av');
            // ZoomMtg.preloadWasm(); // Comment this line if it's causing an error
            ZoomMtg.prepareWebSDK();
        
            ZoomMtg.generateSDKSignature({
                meetingNumber: payload.meetingNumber,
                role: payload.role,
                sdkKey: payload.sdkKey,
                sdkSecret: payload.sdkSecret,
                success: function (signature) {
                    ZoomMtg.init({
                        leaveUrl: payload.leaveUrl,
                        success: function () {
                            ZoomMtg.join({
                                meetingNumber: payload.meetingNumber,
                                signature: signature.result,
                                sdkKey: payload.sdkKey,
                                userName: payload.userName,
                                userEmail: payload.userEmail,
                                passWord: payload.password, // Correct field name
                                tk: '',
                                success: function () {
                                    console.log('--Joined--');
                                },
                                error: function (error) {
                                    console.log(error);
                                }
                            })
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    })
                },
                error: function (error) {
                    console.log(error);
                }
            })
        };
        
        initializeZoom();
    }, [payload]);

    return (
        <Fragment>
            <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.9.0/css/bootstrap.css" />
            <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.9.0/css/react-select.css" />
        </Fragment>
    );
};

export default Meeting;

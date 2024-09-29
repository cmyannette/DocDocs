import React, { useEffect, Fragment, useState } from "react";

const Meeting = ({ payload }) => {
    const [isVideoMuted, setIsVideoMuted] = useState(true);
    const [isAudioMuted, setIsAudioMuted] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const initializeZoom = async () => {
            try {
                const { ZoomMtg } = await import("@zoomus/websdk");

                ZoomMtg.setZoomJSLib('https://source.zoom.us/lib', 'av');
                ZoomMtg.prepareWebSDK();

                if (isMounted) {
                    ZoomMtg.generateSDKSignature({
                        meetingNumber: payload.meetingNumber,
                        role: payload.role,
                        sdkKey: payload.sdkKey,
                        sdkSecret: payload.sdkSecret,
                        success: function (signature) {
                            if (isMounted) {
                                ZoomMtg.init({
                                    leaveUrl: payload.leaveUrl,
                                    isSupportAV: true,
                                    success: function () {
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
                                                console.error("Join Error:", error.message || JSON.stringify(error));
                                            }
                                        });
                                    },
                                    error: function (error) {
                                        console.error("Init Error:", error.message || JSON.stringify(error));
                                    }
                                });
                            }
                        },
                        error: function (error) {
                            console.error("Signature Error:", error.message || JSON.stringify(error));
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

    // Function to toggle camera
    const onCameraClick = async () => {
        const { ZoomMtg } = await import("@zoomus/websdk");
        const mediaStream = ZoomMtg.getMediaStream();
        
        if (isVideoMuted) {
            await mediaStream.startVideo();
            setIsVideoMuted(false);
        } else {
            await mediaStream.stopVideo();
            setIsVideoMuted(true);
        }
    };

    // Function to toggle microphone
    const onMicrophoneClick = async () => {
        const { ZoomMtg } = await import("@zoomus/websdk");
        const mediaStream = ZoomMtg.getMediaStream();
        
        if (isAudioMuted) {
            await mediaStream.unmuteAudio();
            setIsAudioMuted(false);
        } else {
            await mediaStream.muteAudio();
            setIsAudioMuted(true);
        }
    };

    return (
        <Fragment>
            {/* Including required Zoom Web SDK stylesheets */}
            <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.9.0/css/bootstrap.css" />
            <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.9.0/css/react-select.css" />

            {/* Buttons to toggle camera and microphone */}
            <div>
                <button onClick={onCameraClick}>
                    {isVideoMuted ? "Turn Camera On" : "Turn Camera Off"}
                </button>
                <button onClick={onMicrophoneClick}>
                    {isAudioMuted ? "Unmute Microphone" : "Mute Microphone"}
                </button>
            </div>
        </Fragment>
    );
};

export default Meeting;

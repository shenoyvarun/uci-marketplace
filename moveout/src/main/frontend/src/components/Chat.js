import React, {Component} from 'react';

class Chat extends Component {
    componentDidMount() {
        (function(d, m){
            var kommunicateSettings = {"appId":"1b1eacb78637b8086f19106069a91ead2","popupWidget":true,"automaticChatOpenOnNavigation":true};
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default Chat;
import React, { Component } from 'react';

class WaitingVerification extends Component {
    render() {
        return (
            <div>
                <h2>Tolong Diperhatikan</h2>
                <p>Silahkan mengecheck email anda untuk verifikasi account anda</p>
                <p>
                    Bila anda tidak mendapatkan email dari Penguasa Club Hokage
                    harap cemas, dan click button dibawah untuk Resend
                </p>
                <input type="button" value="Resend Email" />
            </div>
        )
    }
}

export default WaitingVerification;
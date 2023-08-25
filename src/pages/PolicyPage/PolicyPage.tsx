import './PolicyPage.scss'

export default function PolicyPage() {
    return (
        <div className='policy-container'>
            <div className='policy-content'>
                <h1 className='title'>Privacy Policy</h1>
                <h2 className='date'>
                    Effective Date:{' '}
                    {new Date('2023-08-23').toLocaleDateString()}
                </h2>
                <p className='description'>
                    Welcome to PIX ("app")! Our app provides you with the
                    ability to view and access your photo and video files from
                    your Google Drive within the app. This Privacy Policy is
                    designed to help you understand how we collect, use, and
                    safeguard your information when you use our app.
                </p>
                <h3 className='subtitle'>Information We Collect</h3>
                <p className='description'>
                    Our app does not collect, store, or transmit any of your
                    personal information. We do not collect any user-specific
                    data, including but not limited to names, email addresses,
                    or any other personally identifiable information.
                </p>
                <h3 className='subtitle'>Authorization and Access</h3>
                <p className='description'>
                    To enable the functionality of accessing your Google Drive
                    files, we use Google's OAuth consent screen to securely
                    authorize your Google account. This allows us to access your
                    Google Drive files and folders in a read-only mode. We do
                    not store your Google account credentials, and your
                    authorization is managed by Google's authentication system.
                    We do not have the capability to modify, delete, or add any
                    files to your Google Drive.
                </p>
                <h3 className='subtitle'>Use of Information</h3>
                <p className='description'>
                    As mentioned earlier, we do not collect or store any user
                    information, including your Google account information. Our
                    app simply provides a secure way for you to view your Google
                    Drive photo and video files within the app. We do not cache
                    or save any files, metadata, or access tokens.
                </p>
                <h3 className='subtitle'>Third-Party Services</h3>
                <p className='description'>
                    Our app solely relies on Google services for authentication
                    and data access. Please refer to Google's Privacy Policy for
                    information about how Google collects, uses, and protects
                    your data.
                </p>
                <h3 className='subtitle'>Security Measures</h3>
                <p className='description'>
                    We take the security of your data seriously. The OAuth
                    authorization process ensures a secure and encrypted
                    connection between the App and your Google account. Our App
                    does not have access to your Google account credentials, and
                    all data transmissions are protected through
                    industry-standard encryption protocols.
                </p>
                <h3 className='subtitle'>Changes to this Privacy Policy</h3>
                <p className='description'>
                    We may update this Privacy Policy from time to time. Any
                    changes we make will be posted on this page, and the
                    effective date will be indicated at the top of the policy.
                </p>
                <h3 className='subtitle'>Contact Us </h3>
                <p className='description'>
                    If you have any questions or concerns about this Privacy
                    Policy or our app's practices, please contact us at{' '}
                    <a
                        className='email'
                        href='mailto:mykyta.pidhornyi@nixs.com'
                    >
                        mykyta.pidhornyi@nixs.com
                    </a>
                    .
                </p>
                <p className='description'>
                    <span>
                        By using our app, you agree to the terms outlined in
                        this Privacy Policy.
                    </span>{' '}
                    Please be assured that we are committed to maintaining the
                    privacy and security of your information while providing you
                    with a seamless and enjoyable user experience.
                </p>
            </div>
        </div>
    )
}

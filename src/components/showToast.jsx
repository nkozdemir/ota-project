import toast from 'react-hot-toast'

const showToast = (status) => {
    switch (status) {
        case 'ok':
            toast.custom(
                <div className="alert alert-success w-fit flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Submission successful!</span>
                </div>
            )
            break;
        case 'err':
            toast.custom(
                <div className="alert alert-error w-fit flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Error! Submission failed.</span>
                </div>
            )
            break;
        case 'missing':
            toast.custom(
                <div className="alert alert-warning w-fit flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Fill out missing fields!</span>
                </div>
            )
            break;
        case 'vin':
            toast.custom(
                <div className="alert alert-error w-fit flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>VIN number(s) must be 17 characters!</span>
                </div>
            )
            break;
        default:
            null
    }
}

export default showToast
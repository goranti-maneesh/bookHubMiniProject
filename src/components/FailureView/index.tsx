import './index.css'

interface FailureViewInterface{
    tryAgain: () => void
}

const FailureView = (props: FailureViewInterface) => {

    const onClicktryAgainBtn = () => {
        const {tryAgain} = props
        tryAgain()
    }

    return(
    <div className="failure-view-container">
        <img src="https://res.cloudinary.com/degjdup40/image/upload/v1650684083/Group_7522_l65ifd.png" alt="failure view" className="failure-view"/>
        <h1 className="failure-heading">Something went wrong, Please try again</h1>
        <button className="failure-try-again-btn" onClick={onClicktryAgainBtn}>Try Again</button>
    </div>
)
}

export default FailureView
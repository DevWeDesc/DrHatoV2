import { SpinnerContainer } from "./styles";

export function LoadingSpinner() {
    return (
        <SpinnerContainer>
            <div className="lds-dual-ring"></div>
        </SpinnerContainer>
    )
}
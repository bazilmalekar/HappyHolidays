import Alert from 'react-bootstrap/Alert';

interface Props {
    message: string | null;
}

function ErrorAlert({ message }: Props) {
    return (
        <>
            {['danger'].map((variant) => (
                <Alert key={variant} variant={variant}>
                    {/* This is a {variant} alert—check it out! */}
                    {message}
                </Alert>
            ))}
        </>
    );
}

export default ErrorAlert;
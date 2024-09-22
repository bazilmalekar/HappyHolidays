interface Props {
    price: number
}

const PriceConverter = ({ price }: Props) => {
    return (
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(
            price,
        )
    );
}

export default PriceConverter;
export default function ProgressBarUnit({ index, value }) {
    return (
        <div
            id={index}
            className={`flex justify-center`}
            role="progressbar"
            style={{
                height: "100%",
                opacity: `${index + 1 > value ? '0' : '1'}`,
                transition: 'all 1s ease-out',
                backgroundColor: `hsl(200, 100%, ${index+2}0%)`
            }}
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
            value="100"></div>
    );
}
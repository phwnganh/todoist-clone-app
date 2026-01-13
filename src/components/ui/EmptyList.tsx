import EmptyImage from '../../assets/not-found-list.avif'
const EmptyList = () => {
    return (
        <div className={"flex flex-col justify-center items-center"}>
            <img src={EmptyImage} className={"empty-image"}/>
            <p className={"text-xl font-medium"}>No Results Found!</p>
        </div>
    );
};

export default EmptyList;
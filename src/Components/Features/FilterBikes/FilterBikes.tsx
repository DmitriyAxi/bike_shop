import {Button, Modal} from "react-bulma-components";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDefaultFilterCriteria, IFilterCriteria, IPriceRange} from "../../../Store/BikesSlice"
import {RootState} from "../../../Store/Store.ts";
import {filterBikes} from "../../../Store/BikesSlice";
import "./FilterBikes.css"

export default function FilterBikes() {
    const [isActive, setIsActive] = useState(false)
    const [filters, setFilters] = useState<IFilterCriteria>(getDefaultFilterCriteria());
    const filterCriteria = useSelector((state: RootState) => state.bikes.filterCriteria)

    const dispatch = useDispatch()
    const { bikeTypes, brands, frameSizes, prices } = filterCriteria;

    const handleCloseModal = () => {
        setIsActive(false)
        setFilters(getDefaultFilterCriteria())
    }

    const handleApplyFilters = () => {
        dispatch(filterBikes(filters));
        handleCloseModal();
    };

    const handleCheckboxChange = (filterType: keyof IFilterCriteria, value: string ) => {
        setFilters((prevFilters) => {
            const currentValues = prevFilters[filterType] as string[]
            const newValues = currentValues.includes(value)
                ? currentValues.filter((item) => item !== value) 
                : [...currentValues, value]
            return { ...prevFilters, [filterType]: newValues }
        });
    };

    const handleChangePrice = (priceRange: IPriceRange) => {
        setFilters((prevFilters) => ({...prevFilters, prices: [priceRange]}));
    };

    const handleInStock = (checked: boolean) => {
        setFilters((prevFilters) => ({...prevFilters, inStock: checked}));
    };

    return (
        <>
            <Button onClick={() => setIsActive(true)}>
                Filter
            </Button>
            <Modal 
                show={isActive}
                showClose={true}
                onClose={handleCloseModal}
                closeOnBlur={true}
                closeOnEsc={true}
            >
                <Modal.Card>
                    <Modal.Card.Header>
                        <Modal.Card.Title>
                            Choose filter
                        </Modal.Card.Title>
                    </Modal.Card.Header>
                    <Modal.Card.Body>
                        <div>
                            <span>Bike type:</span>
                            {bikeTypes.map((bikeType) =>
                                <label className="filterLabel">
                                    <input 
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange("bikeTypes", bikeType)}
                                    />
                                    <span>{bikeType}</span>
                                </label>
                            )}
                        </div>
                        <div>
                            <span>Bike brand:</span>
                            {brands.map((bikeBrand) =>
                                <label className="filterLabel">
                                    <input 
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange("brands", bikeBrand)}
                                    />
                                    <span>{bikeBrand}</span>
                                </label>
                            )}
                        </div>
                        <div>
                            <span>Price range: </span>
                            {prices.map((price) => (
                                <label key={price.id} className="filterLabel">
                                    <input
                                        type="radio"
                                        name="priceRange" 
                                        onChange={() => handleChangePrice(price)}
                                    />
                                    <span>{price.name}</span>
                                </label>
                            ))}
                        </div>
                        <div>
                            <span>Frame size:</span>
                            {frameSizes.map((frameSize) =>
                                <label className="filterLabel">
                                    <input 
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange("frameSizes", frameSize)}
                                    />
                                    <span>{frameSize}</span>
                                </label>
                            )}
                        </div>
                        <div>
                            <span>In stock:</span>
                            <label className="filterLabel">
                                <input 
                                    type="checkbox" 
                                    onChange={(event) => handleInStock(event.target.checked)}
                                />
                                <span>In stock</span>
                            </label>
                        </div>
                    </Modal.Card.Body>
                    <Modal.Card.Footer justifyContent="end">
                        <Button onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={handleApplyFilters}>
                            Save
                        </Button>
                    </Modal.Card.Footer>
                </Modal.Card>
            </Modal>
        </>
    );
}
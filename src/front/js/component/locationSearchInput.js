import React, { useState } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const LocationSearchInput = ({ setLocation, setCoordinates }) => {
    const [address, setAddress] = useState("");

    const handleChange = (newAddress) => {
        setAddress(newAddress);
    };

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const ll = await getLatLng(results[0]);
        setAddress(value); // Set the address to what the user selected
        setLocation(value); // Set the location in the parent component
        setCoordinates(ll); // Set the coordinates in the parent component
    };

    return (
        <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
            className="mt-0"
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input form-control',
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                    className="border p-1 rounded"
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
};

export default LocationSearchInput;

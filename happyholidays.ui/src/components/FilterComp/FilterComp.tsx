import React from "react";

const FilterComp: React.FC = () => {
    return (
        <div className="filter_comp">
            <div className="comp_header">
                <h3>Select Location</h3>
            </div>
            <div className="filter_location_list">
                <div className="individual_location">
                    <input type="checkbox" />
                    <label>All</label>
                </div>
            </div>
        </div>
    );
}

export default FilterComp;
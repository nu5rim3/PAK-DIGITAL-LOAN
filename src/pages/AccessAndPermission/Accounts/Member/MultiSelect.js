import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import SelectMultiple from "react-select";
import makeAnimated from 'react-select/animated';
import { Controller } from "react-hook-form";

import {
  getRoles,
} from "services/role.service";

const MultiSelect = ({control}) => {

    const [roles, setRoles] = useState([]);

        useEffect(() => {
            var _isMounted = true;

            const fetchData = async () => {
            const roleResponse = await getRoles();
            
            if (_isMounted) {
                setRoles(roleResponse);            
            }
        };

        fetchData();

        return () => {
        _isMounted = false;
        }
        }, [])
    
        const options = roles.map((item, index) => { return {key:index, label: item.description, value: item.code } })
        console.log(options);  

        const animatedComponents = makeAnimated();

    return (
        <div className="mb-3">                    
                <label htmlFor="user-role">Role</label>
                <Controller
                    control={control}
                    name="role"
                    render={({ field: { value, onChange, onBlur } }) => {
                    return(
                        <SelectMultiple
                            id="user-role"
                            name="role"
                            options={options}
                            placeholder={"Choose one or more..."}
                            isMulti={true}
                            components={animatedComponents}
                            onChange={(options) =>
                                onChange(options?.map((option) => option.value))
                            }
                            onBlur={onBlur}
                            value={options.filter((option) => value?.includes(option.value))}               
                        
                        />
                    )}}
                
                />
        </div>
    )

}

MultiSelect.propTypes = {
  control: PropTypes.object
}

export default MultiSelect;
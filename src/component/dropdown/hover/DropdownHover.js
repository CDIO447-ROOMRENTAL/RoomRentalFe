import React, { useState } from 'react';
import "./DropdownHover.css";

function DropDownHover({ title, content }) {
    return (
        <div class="dropdown">
            <span>{title}</span>
            <div class="dropdown-content">
                <div>{content}</div>
            </div>
        </div>
    );
}

export default DropDownHover;

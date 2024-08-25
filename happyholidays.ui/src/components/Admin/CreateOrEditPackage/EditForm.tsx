import React from "react";
import { useParams } from "react-router-dom";

const EditForm: React.FC = () => {
    const {id} = useParams<{id: string}>();

    return (
        <>Edit Form : {id}</>
    );
}

export default EditForm;
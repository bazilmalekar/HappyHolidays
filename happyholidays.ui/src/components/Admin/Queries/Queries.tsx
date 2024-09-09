import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { deleteQuery, getExistingQuery, getQueries, handleExistingQueryRemarksChange, handleExistingQueryStatusChange, setDeleteStateIdel, setUpdateStateIdel, updateQuery } from "../../../services/Slice/contactSlice";
import { RootState } from "../../../services/store";
import Accordion from 'react-bootstrap/Accordion';
import { ContactFrom } from "../../Home/ContactUsForm/contactFormInterface";

const Queries: React.FC = () => {
    const dispatch = useAppDispatch();
    const { contactData,
        contactDataStatus,
        constactDataError,
        updatedContactData,
        updatedContactStatus,
        updateContactError,
        deleteContactStatus,
        deleteContactError
    } = useAppSelector((state: RootState) => state.contactSlice);
    const [updateContactId, setUpdateContactId] = useState<number>();
    const [fetchUpdatedData, setFetchUpdatedData] = useState<boolean>(false); //flag to avoid continuous fetching
    const [deleteFlag, setDeleteFlag] = useState<boolean>(false);

    const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>, id: number) => {
        setUpdateContactId(id);
        dispatch(handleExistingQueryStatusChange({ value: parseInt(e.target.value), id }));
        setFetchUpdatedData(true);
    }

    const handleQueryDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this Query?")) {
            dispatch(deleteQuery(id));
            setDeleteFlag(true);
        }
    }

    const handleRemarksUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        e.preventDefault();
        const [updatedRemark] = contactData.filter((elem: ContactFrom) => {
            return elem.contactUsId === id;
        });
        if (updatedRemark) {
            console.log("updated Remark", updatedRemark);
            dispatch(updateQuery(updatedRemark));
            console.log(updatedContactStatus);
            
        };
    }

    useEffect(() => {
        if (fetchUpdatedData) {
            const [updatedContactDetails] = contactData?.filter((elem: ContactFrom) => elem.contactUsId == updateContactId);
            dispatch(updateQuery(updatedContactDetails));
            setFetchUpdatedData(true);
        }
    }, [fetchUpdatedData]);

    useEffect(() => {
        // fetching all queries after successful update
        if (updatedContactStatus === "success" && fetchUpdatedData) {
            dispatch(getQueries());
            setFetchUpdatedData(false);
            dispatch(setUpdateStateIdel());
        }
    }, [fetchUpdatedData]);

    useEffect(() => {
        if (deleteContactStatus == "success" && deleteFlag) {
            dispatch(getQueries());
            setDeleteFlag(false);
            dispatch(setDeleteStateIdel());
        }
    }, [deleteFlag, deleteContactStatus, dispatch])

    useEffect(() => {
        dispatch(getQueries());
    }, [dispatch])

    return (
        <div className="queries">
            <h1 className="mb-3">Queries</h1>
            <hr />
            <Accordion className="accordion">
                {
                    contactData && contactData.length &&
                    contactData.map((elem: any) => {
                        return (
                            <Accordion.Item eventKey={elem.contactUsId} key={elem.contactUsId} className={`accordion_item ${elem.status == 0 && "NA" || elem.status == 1 && "AA" || elem.status == 2 && "HH"}`}>
                                <Accordion.Header className="accordion_header">{elem.name}</Accordion.Header>
                                <Accordion.Body className="accordion_body">
                                    <div className="details">
                                        <div className="info_group">
                                            <label>Name :</label>
                                            <p>{elem.name}</p>
                                        </div>
                                        <div className="info_group">
                                            <label>Email :</label>
                                            <p>{elem.email}</p>
                                        </div>
                                        <div className="info_group">
                                            <label>Phone Number :</label>
                                            <p>{elem.phoneNumber}</p>
                                        </div>
                                        <div className="info_group">
                                            <label>Travel Destination :</label>
                                            <p>{elem.travelDestination}</p>
                                        </div>
                                        <div className="info_group">
                                            <label>Date Of Travle :</label>
                                            <p>{elem.dateOfTravle}</p>
                                        </div>
                                        <div className="info_group">
                                            <label>Number Of People :</label>
                                            <p>{elem.noOfPeople}</p>
                                        </div>
                                        <div className="info_group">
                                            <label>Message :</label>
                                            <p>{elem.message}</p>
                                        </div>
                                    </div>
                                    <div className="remarks">
                                        <div>
                                            <button className="deletebtn btn btn-danger" onClick={(e) => handleQueryDelete(e, elem.contactUsId)}>Delete Query</button>
                                        </div>
                                        <form>
                                            <div className="info_group">
                                                <label>Query Date :</label>
                                                <p>{elem.queryDate}</p>
                                            </div>
                                            <div className="info_group">
                                                <label>Remarks :</label>
                                                <select onChange={(e) => {
                                                    handleStateChange(e, elem.contactUsId)
                                                }} name="status" value={elem.status}>
                                                    <option value={0}>Not Addressed</option>
                                                    <option value={1}>Addressed</option>
                                                    <option value={2}>On Hold</option>
                                                </select>
                                            </div>
                                        </form>
                                        <form>
                                            <div className="info_group">
                                                <label>Remarks :</label>
                                                <textarea value={elem.remarks} rows={5} onChange={(e) => dispatch(handleExistingQueryRemarksChange({ value: e.target.value, id: elem.contactUsId }))} />
                                                <button className="btn btn-primary mt-1" onClick={(e) => handleRemarksUpdate(e, elem.contactUsId)}>Update Remarks</button>
                                            </div>
                                        </form>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })
                }
            </Accordion>
        </div>
    );
}

export default Queries;
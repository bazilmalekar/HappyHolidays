import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../services/hooks";
import { getQueries } from "./queriests";
import { RootState } from "../../../services/store";
import Accordion from 'react-bootstrap/Accordion';

const Queries: React.FC = () => {
    const dispatch = useAppDispatch();
    const { contactData, contactDataStatus, constactDataError } = useAppSelector((state: RootState) => state.contactSlice);
    
    const [contacEdittDetails, setContactEditDetails] = useState(contactData);

    useEffect(() => {
        dispatch(getQueries())
    }, [dispatch])
    return (
        <div className="queries">
            <h1 className="mb-3">Queries</h1>
            <hr />
            <Accordion className="accordion">
                {
                    contactData && contactData.length &&
                    contactData.map((elem: any) => {
                        console.log(elem);

                        return (
                            <Accordion.Item eventKey={elem.contactUsId} key={elem.contactUsId} className="accordion_item">
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
                                            <button className="deletebtn btn btn-danger">Delete Query</button>
                                        </div>
                                        <form>
                                            <div className="info_group">
                                                <label>Query Date :</label>
                                                <p>{elem.queryDate}</p>
                                            </div>
                                            <div className="info_group">
                                                <label>Remarks :</label>
                                                <select>
                                                    <option>Not Addressed</option>
                                                    <option>Addressed</option>
                                                    <option>On Hold</option>
                                                </select>
                                            </div>
                                        </form>
                                        <form>
                                            <div className="info_group">
                                                <label>Remarks :</label>
                                                <textarea rows={5} />
                                                <button className="btn btn-primary mt-1">Update Remarks</button>
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
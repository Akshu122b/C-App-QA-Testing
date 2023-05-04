import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPligin from '@fullcalendar/timegrid';
import InteractionPlugin from "@fullcalendar/interaction";
import ListPlugin from "@fullcalendar/list";
import Datetime from 'react-datetime';
import Popup from 'reactjs-popup';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import *as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../index.css';




export default function () {

    const [username, setuserName] = useState("");
    const [title, setTitle] = useState("");
    const [roomName, setroomName] = useState("");
    const [StartTime, setStartTime] = useState(Date());
    const [EndTime, setEndTime] = useState(Date());
    const [availability, setAvailability] = useState(true);
    const [Data, setData] = useState([]); // store the post data
    const [eventData, setEventData] = useState([]); // store the Display data

    const [RowData, setRowData] = useState([]);
    const [ViewShow, setViewShow] = useState(false);
    const handleViewShow = () => { setViewShow(true) }
    const handleViewClose = () => { setViewShow(false) }

    // For Edit Modal*****
    const [ViewEdit, setEditShow] = useState(false);
    const handleEditShow = () => { setEditShow(true) }
    const handleEditClose = () => { setEditShow(false) }

    // For delete Modal*****
    const [ViewDelete, setDeleteShow] = useState(false);
    const handleDeletShow = () => { setDeleteShow(true) }
    const handleDeleteClose = () => { setDeleteShow(false) }

    // For Add new data Modal*****
    const [ViewPost, setPostShow] = useState(false);
    const handlePostShow = () => { setPostShow(true) }
    const handlePostClose = () => { setPostShow(false) }

    const [Delete, setDelete] = useState(false);
    //id for update record and delete
    const [id, setId] = useState("");

    const handleclick = async (event) => {
        event.preventDefault();
        const payload = {
            username: username,
            title: title,
            roomName: roomName,
            StartTime: StartTime,
            EndTime: EndTime,
            availability: availability
        }
        const config = { headers: { "Content-Type": "Application/json" } }
        await axios.post('http://localhost:4000/create-event', payload, config)
            .then(() => { alert("Event is Confirmed") })
            .catch((e) => { alert("The slot is already booked") })
            // window.location.reload()
            .then(() => { console.log("added data from axios") })
            .catch((e) => { alert("the slot is already booked") })

    }


    useEffect(() => {
        axios.get('http://localhost:4000/get-events')
            .then((d) => {
                const cdata = d.data.map(item => {
                    return { username: item.username, title: item.title, date: item.StartTime }
                })
                setData(cdata)
            })
            .catch((e) => { console.log(e) })

    }, [])

    console.log(Data)



    //this api Display Event 

    useEffect(() => {
        axios.get('http://localhost:4000/get-events')
            .then((d) => {
                setEventData(d.data)
            })
            .catch((e) => { console.log(e) })

    }, [])


    //Update the Event
    const handleEdit = () => {
        const Credentials = { title, roomName, StartTime, EndTime, availability }
        axios.put(`http://localhost:4000/update-event/${id}`, Credentials)
            .then((d) => {
                setData(d.data)
            })
            .catch((e) => { console.log(e) })
        window.location.reload();

    }

    //handle delete function

    const handleDelete = () => {

        axios.delete(`http://localhost:4000/delete-event/${id}`)
            .then((d) => {
                setData(d.data)
            })
            .catch((e) => { console.log(e) })
        window.location.reload();

    }


    return (

        <div>


            <div className='row'>
                <div className='mt-5 mb-4'>

                    <h2>𝕭𝖔𝖔𝖐𝖊𝖉 𝕰𝖛𝖊𝖓𝖙𝖘</h2>

                    {/* <Button varient='primary' onClick={() => { handlePostShow() }} ><i className='fa fa-plu'></i>Add New event</Button> */}

                    {/* <Button varient='primary'  onClick={() => { handlePostShow() }} ><i className='fa fa-plu'></i>Add New event</Button> */}

                </div>
            </div>

            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead className='bg-warning text-white'>
                            <tr>
                                <th>Title</th>
                                <th>Room Name</th>
                                <th>StartTime</th>
                                <th>EndTime</th>
                                <th>Event Booked by</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                eventData.map((item) =>
                                    <tr key={item._id}>
                                        <td>{item.title}</td>
                                        <td>{item.roomName}</td>
                                        <td>{item.StartTime}</td>
                                        <td>{item.EndTime}</td>
                                        <td>{item.username}</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* create modal for view data */}
            <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={handleViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Event Detail</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div>
                                <div className='form-group'>
                                    <input type='text' className='form-control' required value={RowData.title} readOnly />
                                </div>
                            </div>
                            <div>
                                <div className='form-group mt-3'>
                                    <input type='text' className='form-control' required value={RowData.roomName} readOnly />
                                </div>
                            </div>
                            <div>
                                <div className='form-group mt-3'>
                                    <input type='text' className='form-control' required value={RowData.StartTime} readOnly />
                                </div>
                            </div>
                            <div>
                                <div className='form-group mt-3'>
                                    <input type='text' className='form-control' required value={RowData.EndTime} readOnly />
                                </div>
                            </div>



                        </div>
                        {
                            Delete && (
                                <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Confirm Again</Button>
                            )
                        }


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleViewClose}>Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>

            {/* modal for Submit data to database */}

            <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={handlePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Book Your Conference Meeting</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type='text' className='form-control' required value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Please Enter your Title' />
                            </div>

                            <div>
                                <div className='form-group mt-3'>
                                    <label style={{ color: "blue" }}>Select your Room</label>
                                    <select placeholder="Select Room" value={roomName} required onChange={e => setroomName(e.target.value)}>
                                        <option>  </option>
                                        <option>RoomOne</option>
                                        <option>RoomTwo</option>
                                        <option>RoomThree</option>
                                        <option>RoomFour</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className='form-group mt-3'>
                                    <label style={{ color: "blue" }}>StartTime</label>
                                    <Datetime value={StartTime} required onChange={date => setStartTime(date)} />
                                    {/* <Datetime type='text' className='form-control' value={StartTime} onChange={Datetime => setStartTime(Datetime)} placeholder='Event Start Time' /> */}
                                </div>
                            </div>
                            <div>
                                <div className='form-group mt-3'>
                                    <label style={{ color: "blue" }}>EndTime</label>
                                    <Datetime value={EndTime} required onChange={date => setEndTime(date)} />
                                    {/* <Datetime type='text' className='form-control' value={EndTime} onChange={Datetime => setEndTime(Datetime)} placeholder='Event End Time' /> */}
                                </div>
                            </div>

                            <Button type='submit' className='btn btn-success mt-4' onClick={handleclick}>Add new Event</Button>
                            {/* <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmit}>Add new Event</Button> */}

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handlePostClose}>Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>

            {/* modal for Edit data to database */}

            <div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={handleEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Book Your Conference Meeting</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <lable>Title</lable>
                                <input type='text' className='form-control' required='Enter your Title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Please Enter your Title' defaultValue={RowData.title} />
                            </div>

                            <div>
                                <div className='form-group mt-3'>
                                    <label style={{ color: "blue" }}>Select your Room</label>
                                    <select placeholder="Select Room" required='please Select a room' value={roomName} required onChange={e => setroomName(e.target.value)} defaultValue={RowData.roomName}>
                                        <option>  </option>
                                        <option>Big Room</option>
                                        <option>Small Room</option>
                                        <option>Booth One</option>
                                        <option>Booth Two</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className='form-group mt-3'>
                                    <label style={{ color: "blue" }}>StartTime</label>
                                    <Datetime type='text' required="start time is missing" className='form-control' value={StartTime} onChange={(e) => setStartTime(e)} placeholder='Event Start Time' defaultValue={RowData.StartTime} />
                                </div>
                            </div>
                            <div>
                                <div className='form-group mt-3'>
                                    <label style={{ color: "blue" }}>EndTime</label>
                                    <Datetime type='text' required="end time is missing" className='form-control' value={EndTime} onChange={(e) => setEndTime(e)} placeholder='Event End Time' defaultValue={RowData.EndTime} />
                                </div>
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Update</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleEditClose}>Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>

        </div>

    )
}

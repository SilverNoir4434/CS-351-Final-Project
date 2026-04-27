


function MechanicDashboard({changeState}) {
    return (
        <div className="content">
            <button onClick={() => changeState("ServiceVehicle")}>Record Vehicle Service</button>
        </div>
    )
}

export default MechanicDashboard
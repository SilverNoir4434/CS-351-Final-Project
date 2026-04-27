


function BillingDashboard({changeState}) {
    return (
        <div className="content">
            <button onClick={() => changeState("AddBillingData")}>Add Billing Data</button>
        </div>
    )
}

export default BillingDashboard
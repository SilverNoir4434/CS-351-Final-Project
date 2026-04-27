


function SalesDashboard({changeState}) {
    return (
        <div className="content">
            <button onClick={() => changeState("ProcessSale")}>Process Sale</button>
        </div>
    )
}

export default SalesDashboard
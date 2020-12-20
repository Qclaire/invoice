function UpdateOverall() {
    if (name && unitPrice && quantity && length) {
        const tAmount = unitPrice * quantity * length;
        if (!!items) {
            const exists = items.filter(i => i.id === id)
            if (exists[0]) {
                const old = exists[0]
                const newObject = { id, name, unitPrice, quantity: Number(quantity || 0) + Number(old?.quantity || 0), totalAmount: (Number(tAmount) + Number(old.tAmount)).toString(), length: (Number(length) + Number(old.length)).toString() };
                const list = [...items.filter(item => item.id !== id), newObject]
                setItems(list)
            }
            else {
                setItems([...items, selected])
            }
            const total_yet = items.reduce((f, s) => Number(f.totalAmount) + Number(s.totalAmount), 0)
            const taxes = JSON.parse(localStorage.getItem('operationalDetails'))
            setSum(total_yet)
            Number(taxes.getFund) && setInvoiceGetFund(Number(taxes.getFund) * total_yet / 100)
            Number(taxes.NHIL) && setInvoiceNHIL(Number(taxes.NHIL) * total_yet / 100)
            let subt = invoiceGetFund + invoiceNHIL * total_yet;
            setInvoiceVAT(Number(taxes.vat) * subt / 100)
            setSubTotal(subt);
            setTotalAmount(invoiceVAT + subt);
            onDataChange({
                items,
                subTotal,
                totalAmount,
                invoiceVAT,
                invoiceNHIL,
                sum,
                invoiceGetFund,
                date: new Date(),
            })
            setSelected(null)

        }
    }
}

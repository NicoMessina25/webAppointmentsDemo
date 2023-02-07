import { VirtualScroller } from 'primereact/virtualscroller'
import React from 'react'
import ItemListTemplate from '../../ItemListTemplate/ItemListTemplate';
import "./HomePrescriptionsPanel.scss"

export default function HomePrescriptionsPanel({receivedPrescriptions}:any) {

  const template = (item:any, options:any) => {
    // item: Current item.
    // options.index: Index of the item.
    // options.count: Total numbers of items.
    // options.first: Whether this is the first item.
    // options.last: Whether this is the last item.
    // options.even: Whether the index is even.
    // options.odd: Whether the index is odd.
    // options.props: Props of component.
    const {doctor, date, medicationDesc, status} = item;

    return <ItemListTemplate header={doctor} desc={medicationDesc} date={date} state={status} />;
}

  return (  
    <VirtualScroller items={receivedPrescriptions} itemSize={46} itemTemplate={template} />
  )
}

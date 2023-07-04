const event = {
    name: 'Birthday Party',
    guestList: ['Filip', 'Vladi', 'Niki'],
    printGuests() { 
        console.log('Name: ' + this.name)
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name)
        })
    }
}

event.printGuests()
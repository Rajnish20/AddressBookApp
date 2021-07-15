class Person{
    get id(){
        return this._id;
    }
    set id(id){
        this._id = id;
    }

    get fullName(){
        return this._fullName;
    }
    set fullName(fullName){
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$')
        if(nameRegex.test(fullName)){
            this._fullName = fullName;
        }else{
            throw 'Name is Incorrect!';
        }
    }

    get phoneNumber(){
        return this._phoneNumber;
    }
    set phoneNumber(phoneNumber){
        let phnRegex = RegExp('\\d{2}\\d{10}');
        if(phnRegex.test(phoneNumber)){
            this._phoneNumber = phoneNumber;
        }else{
            throw 'Phone Number is Incorrect';
        }
    }

    get address(){
        return this._address;
    }
    set address(address){
        this._address = address;
    }

    get city(){
        return this._city;
    }
    set city(city){
        this._city = city;
    }

    get state(){
        return this._state;
    }
    set state(state){
        this._state = state;
    }

    get pinCode(){
        return this._pinCode;
    }
    set pinCode(pinCode){
        this._pinCode = pinCode;
    }

    toString(){
        return  "id=" + this.id +", Full Name='" + this.fullName + " , Address='" + this.address + " , City='"
        + this.city + " , State='" + this.state + " , PinCode='" + this.pinCode;
    }

}
class UsersList {
    constructor(){
        this.filter = {};
        this.ArrayLIst = [];
        this.banksNumber = [];
        this.container = document.getElementById("table-list");
        this.clearFilter = document.querySelector("#clearFilterBtn");
        this.btnShowFilter = document.querySelector("#showBtn");
        this.buttonSearch = document.getElementById("search-button");
        this.buttonExel = document.querySelector("#dowloadPdf");
        this.containerPages = document.querySelector(".nextPage-block");
        this.openCreatePageBtn = document.querySelector("#createBank-button");
        this.loadingGIF = document.querySelector("#loadingGif");
        this.render();
    }

    editBank = async () => {
        var allTd = document.querySelectorAll(".edit");
        allTd.forEach((td) => {
            td.addEventListener("click", () => {
                var bankName = td.parentElement.children[0].textContent;
                window.open("http://18.216.223.81:3000/create-bank?&" + bankName, '_blank');
            });
        });
    }

    openCreatePage = () => {
        // Loading GIF Off
        this.loadingGIF.style.display = "flex";
        document.body.classList.add("modal-open");

        document.location.href = "http://18.216.223.81:3000/create-bank";
    }

    clearFilters = () => {
        this.filter = {};
        this.selets = document.querySelectorAll("select");
        this.selets.forEach(item => item.value = "");
        this.searchInput = document.querySelector("#search-input").value = "";

        this.container.innerHTML = "";
        this.containerPages.innerHTML = "";

        this.countNextPage(this.ArrayLIst,  this.banksNumber.numbers);
    }

    showFilters = async () => {
        this.filter = {};
        this.filterArray = document.querySelectorAll(".filter");
        this.filterMin = document.querySelector("#filterMin").value;
        this.filterMax = document.querySelector("#filterMax").value;
        this.filterSepa = document.querySelector("#filterSepa").value;
        this.filterEnable = document.querySelector("#filterEnable").value;
        this.filterSolution = document.querySelector("#filterSolution").value;
        this.filterCurrency = document.querySelector("#filterCurrency").value;
        this.filterCountry = document.querySelector("#filterCountry").value;

        // Min Wire Filter
        if (this.filterMin !== ""){
            this.filter.min_wire = {
                $lte: +(this.filterMin)
            };
        }

        // Max Wire Filter
        if (this.filterMax !== ""){
            this.filter.max_wire = {
                $gte: +(this.filterMax)
            };
        }

        // Sepa Filter
        if (this.filterSepa !== ""){
            this.filterSepa === "yes" ? this.filterSepa = true : this.filterSepa = false;
            this.filter.sepa = this.filterSepa;
        }

        // Enable Filter
        if (this.filterEnable !== ""){
            this.filterEnable === "yes" ? this.filterEnable = true : this.filterEnable = false;
            this.filter.active = this.filterEnable;
        }

        // Solution Filter
        this.filterSolution !== "" ? this.filter.solution_name = this.filterSolution : "";

        // Currency Filter
        if(this.filterCurrency !== ""){
            this.filter.currency = {$elemMatch: {$eq: this.filterCurrency}};
        }

        // Country Filter
        this.filterCountry !== "" ? this.filter.country = this.filterCountry : "";

        // If empty Filter
        var emptyObj = this.checkIsEmptyObj(this.filter);
        if (!emptyObj) {

            this.lengthBanks = await this.getBanks_Number(this.filter);
            this.arrBanks = await this.getBanks(0, this.filter);
            
            // Table cleaning
            this.container.innerHTML = "";
            this.containerPages.innerHTML = "";

            // If we got Empty Obj from Data Base. 
            if (this.lengthBanks.numbers) {
                this.countNextPage(this.arrBanks, this.lengthBanks.numbers);
            }
        }
    }

    checkIsEmptyObj = (obj) => {
        for (let key in obj) {
            return false; // wrong
        }
        return true; // is epmty
    }

    downloadExel = () => {
        var tbl = document.getElementById('table-banks');
        var wb = XLSX.utils.table_to_book(tbl, {
            sheet: "Banks table",
            display: true
        });

        var wbout = XLSX.write(wb, {bookType: "xlsx", bookSST: true, type: "binary"});
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        };
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'banks.xlsx');
    }

    searchFunction = async () =>{
        this.phrase = document.getElementById('search-input').value;
        this.filter = { $text: { $search: this.phrase } };

        if(this.phrase){
            this.length = await this.getBanks_Number(this.filter);
            this.filterList = await this.getBanks(0, this.filter);

            this.container.innerHTML = "";
            this.containerPages.innerHTML = "";

            this.countNextPage(this.filterList, this.length.numbers);
        }
    }

    methodPutEnable = (id, status) => {
        fetch("http://18.216.223.81:3000/putBank", {
                    method: "PUT",
                    body: JSON.stringify({
                        id: id, //Must be id!
                        active: status //Data which you want to change
                    }),
                    headers:{'Content-Type': 'application/json'}
                    })
                    .then(res => {
                        res.text();
                    }) 
                    .catch(err => {
                        console.log(err);
                    });
    }

    disableEnableCheck = () => {
        let btnDisable = document.querySelectorAll(".btnDisable");
        btnDisable.forEach((btn) => {
            btn.addEventListener("click", () => {
                if(btn.textContent === "Disable"){
                    btn.textContent = "Enable";
                    btn.style.background = "#00C851";
                    btn.closest("tr").children[11].innerHTML = "<strong>no</strong>";
                    btn.closest("tr").children[11].style.color = "#FF4444";
                    this.id = btn.closest("tr").children[13].innerHTML;

                    this.methodPutEnable(this.id, false);

                } else if(btn.textContent === "Enable") {
                    btn.textContent = "Disable";
                    btn.style.background = "#FF4444";
                    btn.closest("tr").children[11].innerHTML = "<strong>yes</strong>";
                    btn.closest("tr").children[11].style.color = "#00A542";
                    this.id = btn.closest("tr").children[13].innerHTML;
                    
                    this.methodPutEnable(this.id, true);
                }
            });
        });
    }

    checkSepa = () => {
        let itemsSepa = document.querySelectorAll(".statusCheck");
        for (let i = 0; i < itemsSepa.length; i++) {
            if(itemsSepa[i].textContent === "false"){
                itemsSepa[i].style.color = "#FF4444";
                itemsSepa[i].textContent = "no";
            } else {
                itemsSepa[i].style.color = "#00A542";
                itemsSepa[i].textContent = "yes";
            }
        };
    };

    checkEnable = () => {
        const itemEnables = document.querySelectorAll(".enableCheck");
        itemEnables.forEach((item) => {
            if(item.textContent === "false") {
                item.innerHTML = `<strong>no</strong>`;
                item.style.color = "#FF4444";
                item.closest("tr").children[12].childNodes[1].innerHTML = "Enable";
                item.closest("tr").children[12].childNodes[1].style.backgroundColor = "#00C851";
            } else if(item.textContent === "true"){
                item.innerHTML = `<strong>yes</strong>`;
                item.style.color = "#00A542";
                item.closest("tr").children[12].childNodes[1].innerHTML = "Disable";
                item.closest("tr").children[12].childNodes[1].style.backgroundColor = "#FF4444";
            }
        });
    }

    renderNextPage = (page) => {
        this.buttonNext = document.createElement("button");
        this.buttonNext.textContent = page;
        this.buttonNext.classList.add("nextPage-btn");
        this.containerPages.appendChild(this.buttonNext);
    }

    
    countNextPage = (arr, numbersOfpages) => {
        this.loadBanks(arr);
        var lastPage = numbersOfpages / 10;

        if(lastPage > 3){
            lastPage !== parseInt(lastPage) ? lastPage = parseInt(lastPage) + 1 : "";
            for (let i = 1; i < 4; i++) {
                this.renderNextPage([i]);
            }
            this.dotts = document.createElement("span");
            this.dotts.textContent = "...";
            this.dotts.classList.add("dotts");
            this.containerPages.appendChild(this.dotts);
            this.renderNextPage(lastPage);
        } else {
            for (let i = 0; i < lastPage; i++) {
                this.renderNextPage([i+1]);
            }
        }
        var buttonsPage = document.querySelectorAll(".nextPage-btn");
        buttonsPage[0].classList.add("highlight");
        buttonsPage.forEach((btn) => {
            btn.addEventListener("click", async (event) => {

                this.currentEvent = +(event.target.textContent);
                this.listNumber = ((this.currentEvent*10)-10);

                this.nextList = await this.getBanks(this.listNumber, this.filter);

                this.container = document.getElementById("table-list");
                this.container.innerHTML = "";
                
                this.loadBanks(this.nextList);

                if( +(btn.textContent) === lastPage && +(btn.textContent) > 1){
                    btn.closest("div").children[0].textContent = lastPage - 3;
                    btn.closest("div").children[1].textContent = lastPage - 2;
                    btn.closest("div").children[2].textContent = lastPage - 1;

                } else if (+(btn.textContent) !== 1 && +(btn.textContent) > +(btn.closest("div").children[1].innerHTML) && +(btn.textContent) < lastPage-1) {
                    var first =  btn.closest("div").children[0].textContent;
                    var second = btn.closest("div").children[1].textContent;
                    var third = btn.closest("div").children[2].textContent;

                    btn.closest("div").children[0].textContent = Number(first)+ 1;
                    btn.closest("div").children[1].textContent = Number(second) + 1;
                    btn.closest("div").children[2].textContent = Number(third) + 1;

                } else if ( +(btn.textContent) !== 1 && +(btn.textContent) < +(btn.closest("div").children[1].innerHTML) && +(btn.textContent) > 1) {
                    var first =  btn.closest("div").children[0].textContent;
                    var second = btn.closest("div").children[1].textContent;
                    var third = btn.closest("div").children[2].textContent;

                    btn.closest("div").children[0].textContent = Number(first) - 1;
                    btn.closest("div").children[1].textContent = Number(second) - 1;
                    btn.closest("div").children[2].textContent = Number(third) - 1;

                } else if( +(btn.textContent) === 1 ){}

                this.checkClickedPages(this.currentEvent);
            });
        });
    }

    checkClickedPages = (event) => {
        this.buttonsPage = document.querySelectorAll(".nextPage-btn");
        this.buttonsPage.forEach((btn) => {
            event === +(btn.textContent) ? btn.classList.add("highlight") : btn.classList.remove("highlight");;
        });
    };

    getBanks = async (number, filter) => {
        return  await fetch("http://18.216.223.81:3000/getPart-Banks", {
            method: "POST",
            body: JSON.stringify({
                number, 
                filter
            }),
            headers:{'Content-Type': 'application/json'}
        })
        
        .then(res => {
            return res.json();
        }) 
        .catch(err => {
            console.log(err);
        });
    }

    getBanks_Number = async (filter) => {
        return  await fetch("http://18.216.223.81:3000/getNumber-Banks", {
            method: "POST",
            body: JSON.stringify({
                filter
            }),
            headers:{'Content-Type': 'application/json'}
        })
        
        .then(res => {
            return res.json();
        }) 
        .catch(err => {
            console.log(err);
        });
    }

    saveLocalBanks = async (array) => {
        this.banksNumber = await this.getBanks_Number({});
        array = await this.getBanks(0);
        array.forEach((item) => {
            this.ArrayLIst.push(item);
        });
        this.countNextPage(this.ArrayLIst, this.banksNumber.numbers);
    }

    loadBanks = (array) => {
        this.container = document.getElementById("table-list");
        array.forEach((item) => {
            this.userList = document.createElement("tr");
            this.userList.innerHTML =  `
                    <td class="column1 edit">${item.name}</td> 
                    <td class="column2 edit">${item.country}</td> 

                    <td class="column3 edit">
                        <div class="currency_wrapper">
                            <div class="currency_EUR">EUR</div> 
                            <div class="currency_USD">USD</div> 
                        </div>
                    </td>

                    <td class="column4 edit">
                        <div class="currency_wrapper">
                            <div class="currency_EUR">€${item.balance_EUR.balance_requested}</div> 
                            <div class="currency_USD">$${item.balance_USD.balance_requested}</div> 
                        </div>
                    </td> 

                    <td class="column5 edit">
                        <div class="currency_wrapper">
                            <div class="currency_EUR">€${item.balance_EUR.balance_sent}</div> 
                            <div class="currency_USD">$${item.balance_USD.balance_sent}</div> 
                        </div>
                    </td> 

                    <td class="column6 edit">
                        <div class="currency_wrapper">
                            <div class="currency_EUR">€${item.balance_EUR.balance_received}</div> 
                            <div class="currency_USD">$${item.balance_USD.balance_received}</div> 
                        </div>
                    </td>

                    <td class="column7 edit">
                        <div class="currency_wrapper">
                            <div class="currency_EUR">€${item.balance_EUR.balance_approved}</div> 
                            <div class="currency_USD">$${item.balance_USD.balance_approved}</div> 
                        </div>
                    </td>

                    <td class="column8 edit">
                        <div class="currency_wrapper">
                            <div class="currency_EUR">€${item.balance_EUR.balance_available}</div> 
                            <div class="currency_USD">$${item.balance_USD.balance_available}</div> 
                        </div>
                    </td>

                    <td class="column edit9">${item.min_wire}</td> 
                    <td class="column10 edit">${item.max_wire}</td> 
                    <td class="column11 statusCheck edit">${item.sepa}</td> 
                    <td class="column12 enableCheck edit">${item.active}</td> 
                    <td class="column13">
                        <button class="btnDisable">Disable</button>
                    </td>
                    <td class="hide">${item._id}</td>
            `;
            this.container.appendChild(this.userList);
        });
        this.checkSepa();
        this.checkEnable();
        this.disableEnableCheck();
        this.editBank();

        // Loading GIF Off
        this.loadingGIF.style.display = "none";
        document.body.classList.remove("modal-open");
    }

    render(){
        this.saveLocalBanks();
        this.buttonSearch.addEventListener("click", this.searchFunction);
        this.buttonExel.addEventListener("click", this.downloadExel);
        this.btnShowFilter.addEventListener("click", this.showFilters);
        this.clearFilter.addEventListener("click", this.clearFilters);
        this.openCreatePageBtn.addEventListener("click", this.openCreatePage);
        
    }
};

const userList = new UsersList();
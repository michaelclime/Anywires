
// Settle Transfers

$(document).ready(function(){
    $('.settleTransfBtn').on('click', function(event){
      event.preventDefault();
      $('.SettleTransfersWindow').fadeIn();
        let merchantName = document.querySelector('.merchantList').value;
        document.querySelector(".ttableList").innerHTML = '';
        document.querySelector(".walletList").innerHTML = '<option value="">Wallet for Settlement:</option>';
        //let availableInvs  = fetch('http://18.216.223.81:3000/getList');
        let availableInvs  = fetch(`http://localhost:3000/availableInvs/${merchantName}`);
        availableInvs.then(response => {
            return response.json();
        }).then(invoices => {

            class InvoicesList {
                constructor(){
                    this.list = invoices;
                    this.render();
                }
            
                loadInvoice(list) {
                    this.container = document.querySelector(".ttableList");
                    list.slice(0, list.length).forEach((item, i) => {
                        this.invsList = document.createElement("tr");
                        this.invsList.className = `tr${i}`;
                            this.invsList.innerHTML =  `
                            <td class="column column0">  <input class="check" type="checkbox" name=''> ${item.client_details.full_name}</td> 
                            <td class="column column1">${item.amount.amount_received} ${item.currency}</td> 
                            <td class="column column2">${item.commissions} ${item.currency}</td> 
                            <td class="column column3">${item.amount.amount_approved} ${item.currency}</td> 
                        `;   
                    this.container.appendChild(this.invsList);
                    });
                }
                render(){
                    this.loadInvoice(this.list);
                }
            };

            const a = new InvoicesList(invoices);
        });

        //let walletsList  = fetch('http://18.216.223.81:3000/getWalletsList');
        let walletsList  = fetch('http://localhost:3000/getWalletsList');
        walletsList.then(response => {
            return response.json();
            }).then(wallets => {
        
                class WalletOptoinList {
                    constructor(){
                        this.list = wallets;
                        this.render();
                    }
                
                    loadWalllet(list) {
                        this.container = document.querySelector('.walletList');
                        list.slice(0, list.length).forEach((item, i) => {
                            if ( this.container) {
                            this.option = document.createElement("option");
                            this.option.value = item.name;
                            this.option.innerHTML =  item.name;   
                            this.container.append(this.option);
                            }
                        });
                    }
                    render(){
                        this.loadWalllet(this.list);
                    }
                };
        
            const a = new WalletOptoinList(wallets);

            const checkBoxes = document.querySelectorAll(".check");

            checkBoxes.forEach((i) => {
                i.addEventListener('click', (e) => {
                    let spanSum = document.querySelector(".totalSum");
                
                    let indexNumber = +e.target.parentElement.className.match(/\d+/);
                    console.log(indexNumber);
                });
            })
        });
    });
    $('.SettleTransfersWindow-close').on('click', function(event){
      event.preventDefault();
      $('.SettleTransfersWindow').fadeOut();
    });
});


// Pay From AW Wallet

$(document).ready(function(){
    $('.payFromAwWalletBtn').on('click', function(event){
      event.preventDefault();
      $('.MerchantPayWindow').fadeIn();
    });
    $('.MerchantPayWindow-close').on('click', function(event){
      event.preventDefault();
      $('.MerchantPayWindow').fadeOut();
    });
});

// CREATE WALLET

$(document).ready(function(){
    $('.createWalletBtn').on('click', function(event){
      event.preventDefault();
      $('.MerchantPayWindow').fadeOut();
      $('.createWalletWindow').fadeIn();
    });
    $('.createWalletWindow-close').on('click', function(event){
      event.preventDefault();
      $('.createWalletWindow').fadeOut();
      $('.MerchantPayWindow').fadeIn();
    });
});


$(document).ready(function(){
    $('.creatingWalletBtn').on('click', function(event){
      event.preventDefault();
      $('.createWalletWindow').fadeOut();
      $('.wallet').append(`<option>${$('.walletName').val()}</option>`);
      $('.MerchantPayWindow').fadeIn();
    });
});

// SETTLEMENTS LIST 

// Add appendAfter method

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
  },false;


// Add action to buttons ShowAll and Filter

let showAllBtn = document.querySelector('.showAllBtn');
let filterlBtn = document.querySelector('.filterBtn');

showAllBtn.addEventListener('click', (e) => { 
    document.querySelector(".tableList").innerHTML = '';
    const settlementsList = new SettlementsList();});
filterlBtn.addEventListener('click', (e) => { 
    document.querySelector(".tableList").innerHTML = '';
    const filterList = new FilterList();});

// Generate merchants list for selected menu

let fetchPromise  = fetch('http://localhost:3000/getMerchants');
fetchPromise.then(response => {
    return response.json();
    }).then(merchants => {

        class MerchantOptoinList {
            constructor(){
                this.list = merchants;
                this.render();
            }
        
            loadMerchant(list) {
                this.container = document.querySelector('#filterMerchantA');
                list.slice(0, list.length).forEach((item, i) => {
                    if ( this.container) {
                    this.option = document.createElement("option");
                    this.option.value = item.name;
                    this.option.innerHTML =  item.name;   
                    this.container.append(this.option);
                    }
                });
            }
            render(){
                this.loadMerchant(this.list);
            }
        };

    const a = new MerchantOptoinList(merchants);
});

// Show settlements list

const SETTLEMENTS = [{
    CreatedBy: 'CMP24',
    Date: "Apr 19, 2019",
    Amount: "€54 093",
    Type: 'Wire',
    Wallet: 'MisterTango LT', 
    Status: "Received"
},{
    CreatedBy: 'CMP24',
    Date: "Apr 26, 2019",
    Amount: "€64 841",
    Type: 'Wire',
    Wallet: 'MisterTango LT', 
    Status: "Received"
},{
    CreatedBy: 'CMP24',
    Date: "May 3, 2019",
    Amount: "€57 288",
    Type: 'Wire',
    Wallet: 'MisterTango LT', 
    Status: "Received"
},{
    CreatedBy: 'Omer',
    Date: "May 6, 2019",
    Amount: "€57 951",
    Type: '',
    Wallet: '', 
    Status: "Declined"
},{
    CreatedBy: 'Omer',
    Date: "May 6, 2019",
    Amount: "€9 306",
    Type: 'Wire',
    Wallet: 'Epayments Systems Limited', 
    Status: "Received"
},{
    CreatedBy: 'Omer',
    Date: "May 6, 2019",
    Amount: "€5 123",
    Type: 'Wire',
    Wallet: 'Win-Win Media d.o.o', 
    Status: "Received"
},{
    CreatedBy: 'Omer',
    Date: "May 6, 2019",
    Amount: "€10 199",
    Type: 'Wire',
    Wallet: 'Win-Win Media d.o.o', 
    Status: "Received"
},{
    CreatedBy: 'CFM Solutions',
    Date: " May 9, 2019",
    Amount: "€7 450",
    Type: 'Wire',
    Wallet: 'CFM Solutions EOOD', 
    Status: "Requested"
},{
    CreatedBy: 'CK',
    Date: "May 6, 2019",
    Amount: "€57 951",
    Type: '',
    Wallet: '', 
    Status: "Declined"
},{
    CreatedBy: 'CFM Solutions',
    Date: "May 6, 2019",
    Amount: "€57 951",
    Type: '',
    Wallet: '', 
    Status: "Declined"
},{
    CreatedBy: 'CK',
    Date: " May 9, 2019",
    Amount: "€7 450",
    Type: 'Wire',
    Wallet: 'CFM Solutions EOOD', 
    Status: "Requested"
},{
    CreatedBy: 'CFM Solutions',
    Date: " May 9, 2019",
    Amount: "€7 450",
    Type: 'Wire',
    Wallet: 'CFM Solutions EOOD', 
    Status: "Requested"
}
];

var newSettleList = [];

class SettlementsList {
    constructor(){
        this.buttonSearch = document.querySelector('.search-btn');
        this.searchInput =  document.querySelector('.input-search');
        this.render();
    }

    loadSettle(list) {
        this.container = document.querySelector(".tableList");
        list.slice(0, list.length).forEach((item, i) => {
            this.settleList = document.createElement("tr");
            this.settleList.className = `tr${i}`;
            
                this.settleList.innerHTML =  `
                <td class="col column0">${item.merchant}</td> 
                <td class="col column1">${item.dates.creation_date}</td> 
                <td class="col column2">${item.amount}</td> 
                <td class="col column3">${item.Type}</td> 
                <td class="col column4">${item.wallets[0]}</td> 
                <td class="col column5">${item.status}</td>
            `;

        this.settleList.addEventListener('click', (e) => {
            e.preventDefault();
            $('.settlementDetails').fadeIn();

            // Settlement Details Window
            
            this.p = document.createElement('p');
            this.p.className = 'settleInfoText';
            this.span = document.createElement('span');
            this.span.className = 'settleStatusSpan';
            this.indexNumber = +e.target.parentElement.className.match(/\d+/);
            this.p.innerHTML = `Settlement to <strong>${SETTLEMENTS[this.indexNumber].Wallet}</strong> made on : 
                <strong>${SETTLEMENTS[this.indexNumber].Date}</strong> for <strong>${SETTLEMENTS[this.indexNumber].Amount}</strong>.`;
            this.p.appendAfter(document.querySelector('.settlementDetails-header'));
            this.span.innerHTML = `Status: <strong>${SETTLEMENTS[this.indexNumber].Status}</strong>.`;
            this.span.appendAfter(this.p);

            document.querySelector('.settlementDetails-close').addEventListener('click', (e) => {
                this.p.innerHTML = '';
                this.span.innerHTML = '';
                $('.settlementDetails').fadeOut();
            });
        });   
        this.container.appendChild(this.settleList);
        })
    }

    colorStatus() {
        let statusCells = document.querySelectorAll('.column5');
        
        statusCells.forEach( (i) => {
            switch (i.textContent + '') {
                case 'Received':
                    i.style.color = 'rgb(0, 200, 81)';
                    break;
                case 'Declined':
                    i.style.color = 'rgb(255, 119, 119)';
                    break;
                case 'Requested':
                    i.style.color = '#5cb9f3';
                    break;
                case 'Sent':
                    i.style.color = '#f48120';
                    break;
            }
        });
    }

    changeStatus() {
        let btns = document.querySelectorAll('.receivedBtn');

        btns.forEach( (i) => {
            i.addEventListener('click', (e) => {
                e.stopPropagation();
                let state = (e.target.parentElement).previousElementSibling;
                state.innerHTML = "Received";
                this.colorStatus();
                i.style.display = 'none';
                let rowId = +((e.target.parentElement).parentElement).className.match(/\d+/);
                SETTLEMENTS[rowId].Status = "Received";
            });
        });        
    }

    searchFunction() {
        let table = document.getElementById('main-table');
        let phrase = document.querySelector('.input-search').value.toLowerCase();
        for (var i = 1; i < table.rows.length; i++) {
            var flag = false;
            for (var j = 0; j < 6; j++) {
                var item = table.rows[i].cells[j].textContent.toLowerCase();
                if (item.includes(phrase)) flag = true;
            }
            if (!flag) {
                table.rows[i].style.display = "none";
            }
        }
    }

    keyPressSearch() {
        this.searchInput.addEventListener('keydown', (event) => {
            if (event.key == "Enter") {
               this.searchFunction();
            }
        });
    }

    render(){
        this.loadSettle(SETTLEMENTS);
        this.changeStatus();
        this.colorStatus();
        this.buttonSearch.addEventListener("click", this.searchFunction);
        this.keyPressSearch();
    }
};
//const settlementsList1 = new SettlementsList();

// FILTER

class FilterList extends SettlementsList {
  
    filter() {
        let statusMenu = document.querySelector('.status');
        let merchantList = document.querySelector('.merchantList');
        let date =  document.querySelector('.dateForm').value;
        let claim1 = statusMenu.options[statusMenu.selectedIndex].value;
        let claim2 = merchantList.options[merchantList.selectedIndex].value;
        if (claim1 && claim2) {
            newSettleList = SETTLEMENTS.filter( (i) => {
                return (i.Status == claim1) && (i.CreatedBy == claim2);
            } );
        } else {
            newSettleList = SETTLEMENTS.filter( (i) => {
                return claim1 ? (i.Status == claim1) : (i.CreatedBy == claim2);
            } );
        }
    }

    render() {
        this.filter()
        this.loadSettle(newSettleList);
        this.changeStatus();
        this.colorStatus();
    }
}


// UPLOAD FILE BUTTON

document.getElementById('buttonid').addEventListener('click', openDialog);

function openDialog() {
  document.getElementById('fileid').click();
}

// SETTLEMENT PREVIEW 

let prevSettleBtn = document.querySelector('.prevSettleBtn');

prevSettleBtn.addEventListener('click', (e) => {
    document.location.href='/settlementPreview.html';

});

// UPLOAD FILE BUTTON

class Comment {
    constructor(userName, comm) {
        this.userName = userName;
        this.comm = comm;
        this.render();
    }

    coment() {
        this.container = document.querySelector(".commentTitile");
        this.div = document.createElement("div");
        this.div.className = 'comment';
        this.div.innerHTML = `
            <span>${this.userName}</span>
            <p>${this.comm}</p>
        `;
     this.div.appendAfter(this.container);
    }

    render() {
        this.coment();
    }
}

let commentBtn = document.querySelector('.addCommentBtn');

commentBtn.addEventListener('click', (e) => {
    let userName = 'AW_Finance';
    let comm =  document.querySelector('.commentField').value;
    let a = new Comment(userName, comm);
});


// ADD COMMISSION BUTTON

class Commission {
    constructor(userName, commis, commisSum) {
        this.userName = userName;
        this.commis = commis;
        this.commisSum = commisSum;
        this.render();
    }

    commissions() {
        this.container = document.querySelector(".fourthRowCommentBlock");
        this.div = document.createElement("div");
        this.div.className = 'comment';
        this.div.innerHTML = `
            <span>${this.userName}</span>
            <p>${this.commis}</p>
            <span>€${this.commisSum}</span>
        `;
     this.div.appendAfter(this.container);
    }

    render() {
        this.commissions();
    }
}

let commissionBtn = document.querySelector('.addCommissionBtn');

commissionBtn.addEventListener('click', (e) => {
    let userName = 'AW_Finance';
    let commis =  document.querySelector('.commissionType').value;
    let commisSum =  document.querySelector('.commissionAmount').value;
    let c = new Commission(userName, commis, commisSum);
});

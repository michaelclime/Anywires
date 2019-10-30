class invoiceList {
    constructor(){
        this.currentTr = "";
        this.curNumber = "";
        this.ArrayLIst = [];
        this.ArrayBanks = [];
        this.ArrayMerchants = []; 
        this.InvoiceNumbers = [];
        this.btnExel = document.querySelector("#dowloadXls");
        this.clearFilterBtn = document.querySelector("#clearFilterBtn");
        this.showFilterBtn = document.querySelector("#showBtn");
        this.btn_search = document.querySelector(".search-btn");
        this.containerPages = document.querySelector(".nextPage-block");
        this.bankFilter = document.querySelector("#filterBank");
        this.merchFilter = document.querySelector("#filterMerchant");
        this.creationDate = document.querySelector(".creationDate");
        this.receiveDate = document.querySelector(".receiveDate");
        this.currentUser = document.querySelector("#currentUser");
        this.addCommentBtn = document.querySelector("#addCommentBtn");
        this.textAreaAddComment = document.querySelector("#commentText")
        this.firstPage = document.querySelector(".firstPage-block");
        this.firstPageImg = document.querySelector("#first-img");
        this.editInvoiceBtn = document.querySelector("#editBtn");
        this.saveEditedInvoice_btn = document.querySelector("#saveEditedInvoice-btn");
        this.editData = document.querySelectorAll(".editData");
        this.inputSearch = document.querySelector(".input-search");
        this.uploadBtn = document.querySelector("#uploadBtn");
        this.clickToDownload = document.querySelector("#uploadDocs");
        this.requestedBtn = document.querySelector("#requested");
        this.currentInvoice = [];
        this.currentBank = [];
        this.currentMerhcant = [];
        this.currentUserRole = document.querySelector(".curentUserRole");
        this.sentBtn = document.querySelector("#sent");
        this.sentFilter = document.querySelector(".sent_Filter");
        this.sentSubmitBtn = document.querySelector("#sent_submitBtn");
        this.loadingGif = document.querySelector("#loadingGif");
        this.receivedBtn = document.querySelector("#received");
        this.receivedBtnSubmit = document.querySelector("#receive_Submit");
        this.filterReceive = document.querySelector(".receive_Filter");
        this.approvedBtn = document.querySelector("#approved");
        this.filterApproved = document.querySelector(".approved_Filter");
        this.approvedBtnSubmit = document.querySelector("#approved_button");
        this.render();
    }

    approvedInvoiceStatus = async (data) => {
        return  await fetch("http://18.216.223.81:3000/approvedStatus", {
                method: "POST",
                body: JSON.stringify(data),
                headers:{'Content-Type': 'application/json'}
            })
            .then(res => {
                return res.text();
            }) 
            .catch(err => {
                console.log(err);
            });
    }

    approvedStatusInit = async () => {
        if (this.currentInvoice[0].status === "Received") {
            //////  AnyWires Commissions  //////
            var amountReceive = this.currentInvoice[0].amount.amount_received;
            var anyFeePercent = this.currentMerhcant[0].fees.in_c2b.percent;
            var anyFeeFlat = this.currentMerhcant[0].fees.in_c2b.flat;
            var AdditionaFee = Number(document.querySelector("#inputAdditionalFee").value);

            if (this.currentInvoice[0].type === "b2b") {
                anyFeePercent = this.currentMerhcant[0].fees.in_b2b.percent;
                anyFeeFlat = this.currentMerhcant[0].fees.in_b2b.flat;
            }
            var anywiresPercent = anyFeePercent;

            // Check if this $
            if (this.currentInvoice[0].currency === "USD") {
                var currencyInv = await this.getEURexchange("EUR", "USD");
                anyFeeFlat = Math.round(anyFeeFlat * currencyInv.rates.USD);
            }
            

            anyFeePercent = (amountReceive/100)*anyFeePercent;
            AdditionaFee < 0 ? AdditionaFee = 0 : "";
            var amountApproved = amountReceive - anyFeePercent - anyFeeFlat - AdditionaFee;
            var createBy = this.currentUser.textContent.trim();
            var currency = "";
            this.currentInvoice[0].currency === "USD" ? currency = "$" : currency = "€";
            var totalAny = anyFeePercent + anyFeeFlat + AdditionaFee;

            ////////  Solution Commission  //////
            var bankCommission = Number(document.querySelector("#bankCommission").value);
            bankCommission < 0 ? bankCommission = 0 : "";
            var solutionPercent = Number(document.querySelector("#solutionCommPercent").value);
            solutionPercent < 0 ? solutionPercent = 0 : "";
            var solutionFlat = Number(document.querySelector("#solutionCommFlat").value);
            solutionFlat < 0 ? solutionFlat = 0 : "";
            console.log(solutionFlat);

            // Check if this $
            if (this.currentInvoice[0].currency === "USD") {
                var currencyInv = await this.getEURexchange("EUR", "USD");
                solutionFlat = Math.round(solutionFlat * currencyInv.rates.USD);
            }

            var totalSolution = +bankCommission + ((amountReceive/100) * solutionPercent) + solutionFlat;
            var leftFromTransfer = amountReceive - totalSolution;
             
            // Request to Server for changes
            var data = {
                // ANYWIRES_FEES
                "invNumber": this.currentInvoice[0].number,
                "createBy": createBy,
                "currency": currency,
                "amountApproved": amountApproved,
                "AdditionaFee": AdditionaFee,
                "totalAny": totalAny,
                "anywiresPercent": anywiresPercent,
                "anyFeeFlat": anyFeeFlat,
                // SOLUTION_FEES
                "bankCommission": +bankCommission,
                "solutionPercent": solutionPercent,
                "solutionFlat": solutionFlat,
                "totalSolution": +totalSolution,
                "leftFromTransfer": leftFromTransfer
            };
            // Loading GIF appear
            this.loadingGif.style.display = "flex";

            this.approvedInvoiceStatus(data);

            this.filterApproved.style.display = "none";
            // Loading GIF appear
            this.loadingGif.style.display = "none";
        } else {
            alert("You can't do this!");
        }
    }

    approvedStatus = async () => {
        if (this.currentInvoice[0].status === "Received") {
            // Loading GIF appear
            this.loadingGif.style.display = "flex";

            // Filter for background
            this.filterApproved.style.display = "flex";
            this.filterApproved.addEventListener("click", (event) => {
                event.target === this.filterApproved ? this.filterApproved.style.display = "none" : "";
            });

            // Get Current Merchant
            this.currentMerhcant = await this.getCurrentMerchant(0, {"name": this.currentInvoice[0].merchant});
            // Get Current Bank
            this.currentBank = await this.getCurrentBank(0, {"name": this.currentInvoice[0].bank});

            // Check type of Invoice c2b or b2b
            var anyFeePercent = this.currentMerhcant[0].fees.in_c2b.percent;
            var anyFeeFlat = this.currentMerhcant[0].fees.in_c2b.flat;
            var solutionCommPercent = this.currentBank[0].solution_fees.in_c2b.percent;
            var solutionCommFlat = this.currentBank[0].solution_fees.in_c2b.flat;
            if (this.currentInvoice[0].type === "b2b") {
                anyFeePercent = this.currentMerhcant[0].fees.in_b2b.percent;
                anyFeeFlat = this.currentMerhcant[0].fees.in_b2b.flat;
                solutionCommPercent = this.currentBank[0].solution_fees.in_b2b.percent;
                solutionCommFlat = this.currentBank[0].solution_fees.in_b2b.flat;
            }

            // Check if this $
            if (this.currentInvoice[0].currency === "USD") {
                var currencyInv = await this.getEURexchange("EUR", "USD");
                anyFeeFlat = Math.round(anyFeeFlat * currencyInv.rates.USD);
                solutionCommFlat = Math.round(solutionCommFlat * currencyInv.rates.USD);
            }

            // Counting process
            var amountReceived = this.currentInvoice[0].amount.amount_received;
            var currency = "";
            this.currentInvoice[0].currency === "USD" ? currency = "$" : currency = "€";
            var anyFeePercentRes = (amountReceived/100)*anyFeePercent;
            var totalAny = anyFeePercentRes + anyFeeFlat;

            // Render PopUp Window
            document.querySelector("#approved_receivedAmount").innerHTML = `${amountReceived}${currency}`;
            document.querySelector("#anyFeePercent").innerHTML = `${anyFeePercent}`;
            document.querySelector("#anyFeeSymbol").innerHTML = `${currency}`;
            document.querySelector("#approved_anyFeePercent").innerHTML = `${anyFeePercentRes}${currency}`;
            document.querySelector("#approved_anyFeeFlat").innerHTML = `${anyFeeFlat}${currency}`;
            document.querySelector("#approved_total_comm").innerHTML = `${totalAny}${currency}`;
            document.querySelector("#approved_amount").innerHTML = `${amountReceived-totalAny}${currency}`;
            document.querySelector("#inputAdditionalFee").value = "";

            // Event for input Additiona fee
            document.querySelector("#inputAdditionalFee").addEventListener("keyup", () => {
                var addFeeInputValue = Number(document.querySelector("#inputAdditionalFee").value);
                totalAny = anyFeePercentRes + anyFeeFlat + addFeeInputValue;
                document.querySelector("#aprroved_additionalFee").innerHTML = `${addFeeInputValue}${currency}`;
                document.querySelector("#approved_total_comm").innerHTML = `${totalAny}${currency}`;
                document.querySelector("#approved_amount").innerHTML = `${amountReceived-totalAny}${currency}`;
            });

            // Solution Commission Counting
            var solutionCountPercent = (amountReceived/100) * solutionCommPercent;
            var totalSolution = solutionCommFlat + solutionCountPercent;
            document.querySelector("#solutionCommPercent").value = solutionCommPercent;
            document.querySelector("#solutionCommFlat").value = solutionCommFlat;
            document.querySelector("#totalSolution").innerHTML = `${totalSolution}${currency}`;
            document.querySelector("#leftFromTransfer").innerHTML = `${amountReceived - totalSolution}${currency}`;

            var solutionInputs = document.querySelectorAll(".solutionInputs").forEach((inpt) => inpt.addEventListener("keyup", () => {
                var bankComm = Number(document.querySelector("#bankCommission").value);
                var solComPerInpt = Number(document.querySelector("#solutionCommPercent").value);
                var solComPerInptRes = (amountReceived/100) * solComPerInpt;
                var solComFlat = Number(document.querySelector("#solutionCommFlat").value);
                var totalSolComm = bankComm + solComPerInptRes + solComFlat;
                var leftFromTransferComm = amountReceived - totalSolComm;
                document.querySelector("#totalSolution").innerHTML = `${totalSolComm}${currency}`;
                document.querySelector("#leftFromTransfer").innerHTML = `${leftFromTransferComm}${currency}`;
            }));

            // Loading GIF appear
            this.loadingGif.style.display = "none";
        } else {
            alert("You can't do that!");
        }
    }

    getEURexchange = async (base, symbols) => {
        return  await fetch(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbols}`)
         .then(res => {
             return res.json();
         }) 
         .catch(err => {
             console.log(err);
         });
    }

    receivedInvoiceStatus = async (invNumber, typedAmount, amountCommission, percentCommission, createdBy, currency) => {
        return  await fetch("http://18.216.223.81:3000/receivedStatus", {
                method: "POST",
                body: JSON.stringify({
                    invNumber,
                    typedAmount,
                    amountCommission,
                    percentCommission,
                    createdBy,
                    currency
                }),
                headers:{'Content-Type': 'application/json'}
            })
            .then(res => {
                return res.text();
            }) 
            .catch(err => {
                console.log(err);
            });
    }

    receiveStatus = async () => {
        if (this.currentInvoice[0].status === "Sent") {

            // Loading GIF appear
            this.loadingGif.style.display = "flex";

            var typedAmount = document.querySelector("#receive_input").value;
            var amountSent = this.currentInvoice[0].amount.amount_sent;
            var creator = this.currentUser.textContent.trim();
            var currency = "";
            this.currentInvoice[0].currency === "USD" ? currency = "$" : currency = "€";

            // Counting proccess for Commission
            var amountCommission = 0;
            var percentCommission = 0;
            if (+typedAmount !== amountSent) {
                amountCommission = amountSent - typedAmount;
                percentCommission = (100*amountCommission)/amountSent;
            }

            // Add comment about action
            await this.addComment(`Transfer for ${currency}${typedAmount} was Received!`);

            // Loading GIF OFF
            this.loadingGif.style.display = "none";

            // Request for status "Received" 
            this.receivedInvoiceStatus(this.curNumber, typedAmount, amountCommission, percentCommission, creator, this.currentInvoice[0].currency);

            // Change status, received date, amount received for currentInvoice and create new field received_after_commision
            this.currentInvoice[0].status = "Received";
            this.currentInvoice[0].dates.received_date = new Date();
            this.currentInvoice[0].amount.amount_received = +(typedAmount);

            // Change table information
            this.currentTr.children[8].innerHTML = `<strong>Received</strong>`;
            this.currentTr.children[8].style.color = "rgb(85, 140, 223)";
            this.currentTr.children[5].children[0].children[0].textContent = `${currency}${typedAmount}`;
            this.currentTr.children[5].children[0].children[1].textContent = `${this.checkDate(new Date())}`;

            // Change style for popUp
            document.querySelector(".currentStatus").textContent = "Received";
            document.querySelector(".currentStatus").style.color = "rgb(85, 140, 223)";

            // Hide PopUp
            this.filterReceive.style.display = "none";
        } else {
            alert("You can't do this!");
        }
    }

    initialReceivedStatus = async () => {
        if (this.currentInvoice[0].status === "Sent") {

            // Filter for background
            this.filterReceive.style.display = "flex";
            this.filterReceive.addEventListener("click", (event) => {
                event.target === this.filterReceive ? this.filterReceive.style.display = "none" : "";
            });

            // Counting proccess
            var amountSent = this.currentInvoice[0].amount.amount_sent;

            // PopUp render Info
            var currency = "";
            this.currentInvoice[0].currency === "USD" ? currency = "$" : currency = "€";
            document.querySelector(".receive_InvoiceNumber").innerHTML = `invoice #${this.curNumber}`;
            document.querySelector(".receive_SentAmount").innerHTML = `${amountSent}${currency}`
            document.querySelector("#receive_input").value = `${amountSent}`;
        } else {
            alert("You can't do this!");
        }
    }

    sentInvoiceStatus = async (invNumber, amountSent) => {
        return  await fetch("http://18.216.223.81:3000/sentStatus", {
                method: "POST",
                body: JSON.stringify({
                    invNumber,
                    amountSent
                }),
                headers:{'Content-Type': 'application/json'}
            })
            .then(res => {
                return res.text();
            }) 
            .catch(err => {
                console.log(err);
            });
    }

    initialSentStatus = async () => {
        // Checking role of Current User
        var role = this.currentUserRole.textContent.trim();
        var accessRole = ["CrmFinanceManager", "CrmInvoiceManager", "CrmSuccessManager", "CrmAdmin"];
        var result = accessRole.some((item) => item === role);
        
        // If Current User has access
        if (result && this.currentInvoice[0].status === "Requested") {
            // Loading GIF On
            this.loadingGif.style.display = "flex";

            // Loading GIF Off
            this.loadingGif.style.display = "none";

            // Open Modal Sent
            this.sentFilter.style.display = "flex";
            this.sentFilter.style.display = "flex";
            this.sentFilter.addEventListener("click", (event) => {
                event.target === this.sentFilter ? this.sentFilter.style.display = "none" : "";
            });

            // Render PopUp info
            document.querySelector("#sent_input").value = this.currentInvoice[0].amount.amount_requested;

            // Event For button Submit Sent
            this.sentSubmitBtn.addEventListener("click", this.sentStatus);

        } else {
            alert("You can't do this!");
        }
    }

    sentStatus = async () => {
        var sent = document.querySelector("#sent_input").value;
        var currency = "";
        this.currentInvoice[0].currency === "USD" ? currency = "$" : currency = "€";

        // Loading GIF appear
        this.loadingGif.style.display = "flex";

        // Request for status "Sent" 
        this.sentInvoiceStatus(this.curNumber, +sent);

        // Change status, sent date, amount sent for currentInvoice
        this.currentInvoice[0].status = "Sent";
        this.currentInvoice[0].dates.sent_date = new Date();
        this.currentInvoice[0].amount.amount_sent = +sent;

        // Change table information
        this.currentTr.children[8].innerHTML = `<strong>Sent</strong>`;
        this.currentTr.children[8].style.color = "rgb(255, 187, 51)";
        this.currentTr.children[3].children[0].children[0].textContent = `${currency}${+sent}`;
        this.currentTr.children[3].children[0].children[1].innerHTML = `${this.checkDate(new Date())}`;

        // Change style for popUp
        document.querySelector(".currentStatus").textContent = "Sent";
        document.querySelector(".currentStatus").style.color = "rgb(255, 187, 51)";

        // Add new comment
        await this.addComment(`Transfer for ${currency}${+sent} was Sent!`);

        // Loading GIF appear
        this.loadingGif.style.display = "none";
        // Hide Modal Window
        this.sentFilter.style.display = "none";
    }

    requestedInvoiceStatus = async (invoiceNum, sentAmount) => {
        return  await fetch("http://18.216.223.81:3000/requestStatus", {
                method: "POST",
                body: JSON.stringify({
                    invoiceNum,
                    sentAmount
                }),
                headers:{'Content-Type': 'application/json'}
            })
            .then(res => {
                return res.text();
            }) 
            .catch(err => {
                console.log(err);
            });
    }

    requestedStatus = async () => {

        // Get current Invoice
        var role = this.currentUserRole.textContent.trim();
        var currency = "";
        this.currentInvoice[0].currency === "USD" ? currency = "$" : currency = "€";

        // If user CRM admin and Status is Sent
        if (this.currentInvoice[0].status === "Sent" && role === "CrmAdmin") { 
            // Loading GIF appear
            this.loadingGif.style.display = "flex";

            // Request for status "Requested"
            this.requestedInvoiceStatus(this.curNumber, this.currentInvoice[0].amount.amount_sent);

            // Change status, sent date, amount sent for currentInvoice
            this.currentInvoice[0].status = "Requested";
            this.currentInvoice[0].dates.sent_date = "";
            this.currentInvoice[0].amount.amount_sent = 0;

            // Change style for popUp
            document.querySelector(".currentStatus").textContent = "Requested";
            document.querySelector(".currentStatus").style.color = "black";

            // Change table info
            this.currentTr.children[8].innerHTML = `<strong>Requested</strong>`;
            this.currentTr.children[8].style.color = "rgb(104, 103, 103)";
            this.currentTr.children[3].children[0].children[0].textContent = `${currency}0`;
            this.currentTr.children[3].children[0].children[1].innerHTML = `mm/dd/yyyy`;
            
            // this.changeInvoiceStatus("Requested", this.curNumber);
            await this.addComment("Status was changed from Sent to Requested!");

            // Loading GIF appear
            this.loadingGif.style.display = "none";

        } else {
            alert("You can't do this!");
        }
    }

    changeDocsStatus = async (filename, status, number, type) => {
        return  await fetch("http://18.216.223.81:3000/changeDocStatus", {
                method: "POST",
                body: JSON.stringify({
                    filename,
                    status, 
                    number, 
                    type
                }),
                headers:{'Content-Type': 'application/json'}
            })
            .then(res => {
                return res.text();
            }) 
            .catch(err => {
                console.log(err);
            });
    }

    docsBad = async () => {
        // Loading GIF appear
        this.loadingGif.style.display = "flex";

        var filename = event.target.closest("tr").children[4].textContent.trim();
        var status = "Declined";
        var type = event.target.closest("tr").children[1].textContent.trim();
        var statusTd = event.target.closest("tr").children[2].innerHTML = status;
        
        await this.changeDocsStatus(filename, status, this.curNumber, type);
        this.addComment(`${type} was Declined!`);

        // Loading GIF appear
        this.loadingGif.style.display = "none";
    }

    docsGood = async () => {
        // Loading GIF appear
        this.loadingGif.style.display = "flex";

        var filename = event.target.closest("tr").children[4].textContent.trim();
        var status = "Approved";
        var type = event.target.closest("tr").children[1].textContent.trim();
        var statusTd = event.target.closest("tr").children[2].innerHTML = status;
        
        await this.changeDocsStatus(filename, status, this.curNumber, type);
        this.addComment(`${type} was Approved!`);

        // Loading GIF appear
        this.loadingGif.style.display = "none";
    }

    openDocsImage = (event) => {
        var filename = event.target.closest("tr").children[4].textContent.trim();
        window.open(`http://18.216.223.81:3000/upload/${filename}`, '_blank');
    }

    changeFileClickTo = () => {
        this.fileName = document.querySelector(".fileName");
        this.fileWrapper = document.querySelector(".fileWrapper");

        var fileName = this.clickToDownload.files[0];
        this.fileName.innerHTML = fileName.name

        // Add border
        this.fileWrapper.style.backgroundColor = "rgba(18,199,178,1)";
        this.fileWrapper.style.color = "white";
        this.fileWrapper.style.fontWeight = "bold";
        this.fileWrapper.style.border = "none";
    }

    initialUpload = async (event) => {
        // Loading GIF appear
        this.loadingGif.style.display = "flex";

        event.preventDefault();

        var type = document.querySelector("#docsSelect").value.trim();
        var number = this.curNumber;
        var file = document.querySelector("#uploadDocs").files[0];
        var creator = this.currentUser.textContent.trim();
        var emptyFile = this.checkIsEmptyObj(file);
        
        // If File exist and Type too than send req
        if(!emptyFile && type){
            var fd = new FormData();
            fd.append("file", file);
            fd.append("number", number);
            fd.append("type", type);
            fd.append("creator", creator);
            await this.postFile(fd);

            // Add comment about action
            this.addComment(`${type} was Uploaded!`);
     
             // Update Modal Window View
             this.currentInvoice = await this.getInvoices(0, {"number": this.curNumber} ); 

             // Check and render docs
            document.querySelector("#table-docs").innerHTML = "";
            this.tableDocsRender(this.currentInvoice[0].documents.id);
            this.tableDocsRender(this.currentInvoice[0].documents.payment_proof);
            this.tableDocsRender(this.currentInvoice[0].documents.utility_bill);
            this.tableDocsRender(this.currentInvoice[0].documents.declaration);


            //  Cleanning Click to Upload Input
             document.querySelector("#uploadDocs").value = "";
             document.querySelector("#docsSelect").value = "";
             document.querySelector(".fileName").innerHTML = "Click to upload Document";

            //  Restore style for File Wrapper
             this.fileWrapper.style.backgroundColor = "white";
             this.fileWrapper.style.color = "black";
             this.fileWrapper.style.border = "1px solid rgb(159, 159, 159)";
             this.fileWrapper.style.fontWeight = "normal";

             // Loading GIF appear
            this.loadingGif.style.display = "none";
        } else {
            alert("Please choose the file!");
        }
    }

    postFile = async (fd) => {
        return  await fetch("http://18.216.223.81:3000/upload", {
                method: "POST",
                body: fd,
                mode: "no-cors",
                headers:{'Accept': 'application/json'}
            })
            .then(res => {
                return res.text();
            }) 
            .catch(err => {
                console.log(err);
            });
    }

    checkChangesOfEditedInvoice = (current, newData, name) => {
        var comment = ``;
        current = current.toString().trim();
        newData = newData.toString().trim();
        if (current !== newData) {
            comment = `${comment} ${name} changed from ${current} to ${newData};`;
        }
        return comment;
    }

    saveEditedInvoice = async () => {
        // Loading GIF appear
        this.loadingGif.style.display = "flex";

        var sepa = false;
        this.editData[5].checked ? sepa = true : sepa = false;

        var newInvoice = {
            "amount.amount_requested": +(this.editData[0].value),
            "type": this.editData[1].value,
            "currency": this.editData[2].value,
            "bank": this.editData[3].value,
            "merchant": this.editData[4].value,
            "sepa": sepa,
            "client_details.full_name": this.editData[6].value,
            "client_details.email": this.editData[7].value,
            "client_details.phone": this.editData[8].value,
            "client_details.country": this.editData[9].value,
            "client_details.address": this.editData[10].value,
            "client_details.id_number": this.editData[11].value
        };

        // Add comment about action - "save changes to Invoice".
        var comment = ``;
        var reqNew = this.checkChangesOfEditedInvoice(this.currentInvoice[0].amount.amount_requested, this.editData[0].value, "amount requested");
        var typeNew = this.checkChangesOfEditedInvoice(this.currentInvoice[0].type, this.editData[1].value, "type");
        var currNew = this.checkChangesOfEditedInvoice(this.currentInvoice[0].currency, this.editData[2].value, "currency");
        var bankNew = this.checkChangesOfEditedInvoice(this.currentInvoice[0].bank, this.editData[3].value, "bank");
        var merchNew = this.checkChangesOfEditedInvoice(this.currentInvoice[0].merchant, this.editData[4].value, "merchant");
        var nameNew = this.checkChangesOfEditedInvoice(this.currentInvoice[0].client_details.full_name, this.editData[6].value, "client's name");
        var emailNew = this.checkChangesOfEditedInvoice(this.currentInvoice[0].client_details.email, this.editData[7].value, "client's email");
        var phNew = this.checkChangesOfEditedInvoice(this.currentInvoice[0].client_details.phone, this.editData[8].value, "client's phone");
        var countryNew = this.checkChangesOfEditedInvoice(this.currentInvoice[0].client_details.country, this.editData[9].value, "client's country");
        var addrNew = this.checkChangesOfEditedInvoice(this.currentInvoice[0].client_details.address, this.editData[10].value, "client's address");
        var idNew = this.checkChangesOfEditedInvoice(this.currentInvoice[0].client_details.id_number, this.editData[11].value, "client's id number");

        comment = reqNew + typeNew + currNew + bankNew + merchNew + nameNew + emailNew + phNew + countryNew + addrNew + idNew;

        // If something was changed then ->
        if (comment){
            await this.postEditedInvoice(this.curNumber, newInvoice);
            this.addComment(comment);
            // Update Modal Window View
            this.currentInvoice = await this.getInvoices(0, {"number": this.curNumber} ); 
            this.renderViewInvoice(this.currentInvoice);
        } 

        // Cleanning edit Modal Window Edit
        this.editData.forEach((item) => item.value = "");
        this.editData[5].removeAttribute("checked", "checked");
        this.filterEdit.style.display = "none";

        // Loading GIF appear
        this.loadingGif.style.display = "none";
    }

    postEditedInvoice = async (number, newInvoice) => {
    return  await fetch("http://18.216.223.81:3000/postEditedInvoice", {
            method: "POST",
            body: JSON.stringify({
                number,
                newInvoice
            }),
            headers:{'Content-Type': 'application/json'}
        })
        .then(res => {
            return res.text();
        }) 
        .catch(err => {
            console.log(err);
        });
    }

    renderOptionFromArray = (obj, value, select) => {
        obj.forEach((item) => {
            this.renderOption(select, item[value]);
        });
    }

    renderAndSelectOption = (select, value) => {
        var option = document.createElement("option");
        option.setAttribute("selected", "selected");
        option.value = value;
        option.innerHTML = value;
        select.appendChild(option);
    }

    editInvoice = () => {
        this.invoceNumber = document.querySelector(".invoceNumber").innerHTML = this.curNumber;
        // If click on filter - close
        this.filterEdit = document.querySelector(".filterEditIvoice");
        this.filterEdit.style.display = "flex";
        this.filterEdit.addEventListener("click", (event) => {
            event.target === this.filterEdit ? this.filterEdit.style.display = "none" : "";
        });

        // Rendering Current Data Objecs
        this.editData[0].value = this.currentInvoice[0].amount.amount_requested;
        this.editData[1].value = this.currentInvoice[0].type;
        this.editData[6].value = this.currentInvoice[0].client_details.full_name;
        this.editData[7].value = this.currentInvoice[0].client_details.email;
        this.editData[8].value = this.currentInvoice[0].client_details.phone;
        this.editData[9].value = this.currentInvoice[0].client_details.country;
        this.editData[10].value = this.currentInvoice[0].client_details.address;
        this.editData[11].value = this.currentInvoice[0].client_details.id_number;

        // Render Merchant and Banks in select
        this.editData[3].innerHTML = "";
        this.renderOptionFromArray(this.ArrayBanks, "name", this.editData[3]);
        this.renderAndSelectOption(this.editData[3], this.currentInvoice[0].bank);

        this.editData[4].innerHTML = "";
        this.renderOptionFromArray(this.ArrayMerchants, "name", this.editData[4]);
        this.renderAndSelectOption(this.editData[4], this.currentInvoice[0].merchant);

        // Check Sepa
        if(this.currentInvoice[0].sepa){
            this.editData[5].setAttribute("checked", "checked");
        } else {
            this.editData[5].removeAttribute("checked", "checked");
        }

        // Check currency
        this.editData[2].innerHTML = "";
        if(this.currentInvoice[0].currency === "EUR"){
            this.renderAndSelectOption(this.editData[2], this.currentInvoice[0].currency);
            this.renderOption(this.editData[2], "USD");
        } else {
            this.renderAndSelectOption(this.editData[2], this.currentInvoice[0].currency);
            this.renderOption(this.editData[2], "EUR");
        }
    }

    renderViewInvoice = async (obj) => {
        this.filter = document.querySelector(".filter");
        this.filter.style.display = "flex";
        this.filter.addEventListener("click", (event) => {
            if(event.target === this.filter){
                // "On" overflow for BODY
                document.body.classList.remove("modal-open");
                // Hide Modal Window
                this.filter.style.display = "none";
            }
        });

        var statusColor = "";
        if(obj[0].status === "Sent") statusColor = "#FFBB33";
        if(obj[0].status === "Requested") statusColor = "black";
        if(obj[0].status === "Received") statusColor = "#7491F2";
        if(obj[0].status === "Approved") statusColor = "#83C9A0";
        if(obj[0].status === "Available") statusColor = "#00C851";

        this.invoiceNumber = document.querySelector("#invoiceNumber").innerHTML = obj[0].number;
        this.currentStatus = document.querySelector(".currentStatus");
        this.currentStatus.innerHTML = obj[0].status;
        this.currentStatus.style.color = statusColor;

        this.invoiceMerchant = document.querySelector("#invoiceMerchant").innerHTML = obj[0].merchant;
        this.invoiceBank = document.querySelector("#invoiceBank").innerHTML = obj[0].bank;
        this.clientName = document.querySelector("#clientFullName").innerHTML = obj[0].client_details.full_name;

        this.requestFee = document.querySelector("#requestFee").innerHTML = obj[0].amount.amount_requested;

        var currency = "";
        obj[0].currency === "EUR" ? currency = "€" : currency = "$";
        this.invoiceCurrency = document.querySelector("#invoiceCurrency").innerHTML = currency;

        // Cleaning docs table before new docs
        this.tableDocs = document.querySelector("#table-docs").innerHTML = "";
        this.tableComments = document.querySelector("#tableTbody-comments").innerHTML = "";

        // Check and render docs
        this.tableDocsRender(obj[0].documents.id);
        this.tableDocsRender(obj[0].documents.payment_proof);
        this.tableDocsRender(obj[0].documents.utility_bill);
        this.tableDocsRender(obj[0].documents.declaration);

        // Render all Comments
        this.tableCommentsRender(obj[0].comments);

        // Number of Current Invoice
        this.curNumber = obj[0].number;

        // Off overflow for BODY
        document.body.classList.add("modal-open");
    }

    getCurrentMerchant = async (number, filter) => {
        return  await fetch("http://18.216.223.81:3000/getPart-Merchants", {
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

    getCurrentBank = async (number, filter) => {
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

    postCommet = async (number, data, create_by) => {
        return  await fetch("http://18.216.223.81:3000/postComment", {
                method: "POST",
                body: JSON.stringify({
                    number,
                    data,
                    create_by
                }),
                headers:{'Content-Type': 'application/json'}
            })
            .then(res => {
                return res.text();
            }) 
            .catch(err => {
                console.log(err);
            });
    }

    addCommentForBtn = () => {
        // Remove spaces form data
        var data = document.querySelector("#commentText").value.trim();
        this.addComment(data);
    }

    addComment = async (data) => {
        data = `Invoice #${this.curNumber}. ${data}`;
        // If not empty than
        if (data) {
            // Get current User
            var created_by = this.currentUser.textContent.trim();
            // Post new comment
            await this.postCommet(this.curNumber, data, created_by);

            this.currentInvoice = await this.getInvoices(0, {"number": this.curNumber} ); 
            this.tableComments = document.querySelector("#tableTbody-comments").innerHTML = "";
            this.tableCommentsRender(this.currentInvoice[0].comments);
        }
        document.querySelector("#commentText").value = "";
    }

    tableCommentsRender = (arr) => {
        // Table wich we need to render
        this.tableComments = document.querySelector("#tableTbody-comments");
        // Check if empty
        var ifEmpty = this.checkIsEmptyObj(arr);
        if(!ifEmpty){
            arr.reverse().forEach((item) => {
                var tableTr = document.createElement("tr");
                tableTr.innerHTML = `
                    <td class="comCol1">
                        <div>
                            <div>${item.created_by}</div>
                            <div class="comentsDate">${moment(item.creation_date).format('lll')}</div>
                        </div>
                    </td>
                    <td class="comCol2">${item.message}</td>
                `;

                this.tableComments.appendChild(tableTr);
            });
        }
    }

    tableDocsRender = async (arr) => {
        // Table wich we need to render
        this.tableDocs = document.querySelector("#table-docs");
        // Check if empty
        var ifEmpty = this.checkIsEmptyObj(arr);
        // If not empty render arr
        
        if(!ifEmpty){
            arr.forEach( async (item) => {
                var docArr = await this.getDocs({}, item.id);
                docArr.forEach((doc) => {
                    var tableTr = document.createElement("tr");
                    tableTr.innerHTML = `
                        <td>${doc.creator}</td> 
                        <td>${doc.type}</td> 
                        <td>${doc.status}</td> 
                        <td>
                            <span id="docGood" onclick="userList.docsGood(event)"><i class="far fa-check-circle"></i></span>
                            <span id="docBad" onclick="userList.docsBad(event)"><i class="far fa-times-circle"></i></span>
                        </td>
                        <td class="hide">${doc.filename}</td>
                        <td> <button class="docPreview" onclick="userList.openDocsImage(event)">Preview</button> </td> 
                    `; 
                    this.tableDocs.appendChild(tableTr);
                });
            });
        }
    }

    getDocs = async (filter, id) => {
         return  await fetch("http://18.216.223.81:3000/getDocs", {
                method: "POST",
                body: JSON.stringify({
                    filter,
                    id
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

    viewInvoice = async () => {
        this.tableTd = document.querySelectorAll(".view");
        this.tableTd.forEach((td) => {

            td.addEventListener("click", async () => {
                // Loading GIF appear and scroll off
                this.loadingGif.style.display = "flex";
                document.body.classList.add("modal-open");
                // Take current Tr for future changed
                this.currentTr = td.parentElement;
                // Remove all filters
                this.filter = {};
                // Get number of invoice
                this.number = td.parentElement.children[0].children[0].children[0].children[0].textContent.split("#")[1];
                // Get invoice
                this.currentInvoice = await this.getInvoices(0, {"number": this.number} ); 
                // Loading GIF hide
                this.loadingGif.style.display = "none";
                // Render popup window
                this.renderViewInvoice(this.currentInvoice);
            });

        });
    }

    previewInvoice = (event) => {
        var number = event.target.closest("tr").children[0].children[0].children[0].children[0].textContent.split("#");
        window.open("http://18.216.223.81:3000/invoice-preview?&" + number[1], '_blank');
    }

    filtersData = () => {
        var merchList = [];
        var bankList = [];
        this.ArrayBanks.forEach((bank) => bankList.push(bank.name));
        this.ArrayMerchants.forEach((merchant) => merchList.push(merchant.name));
        
        for (let i = 0; i < bankList.length; i++) {
            this.renderOption(this.bankFilter, bankList[i]);
        }
        for (let m = 0; m < merchList.length; m++) {
            this.renderOption(this.merchFilter, merchList[m]);
        }
    }

    renderOption = (filter, name) => {
        this.option = document.createElement("option");
        this.option.value = name;
        this.option.textContent = name;
        filter.appendChild(this.option);
    }

    searchFunction = async () => {
        var check = this.inputSearch.value;

        const filter = { $text: { $search: check } };

          if(check){
            const lengthInvoice = await this.getNumberOfinvoices(filter);
            const filterList = await this.getInvoices(0, filter);

            // Очищаємо таблицю
            this.container = document.getElementById("table-list");
            this.container.innerHTML = "";
            this.containerPages.innerHTML = "";

            this.countNextPage(filterList, lengthInvoice.numbers);
          }

    }

    saveXls = () => {
        // For hide not useless element XLS
        let col12 = document.querySelectorAll(".column12");
        col12.forEach((item) => item.style.display = "none");

        let col11 = document.querySelectorAll(".colum11");
        col11.forEach((item) => item.style.display = "none");

        setTimeout(() => {
            col12.forEach((item) => item.style.display = "table-cell");
            col11.forEach((item) => item.style.display = "table-cell");
        },10);
        // For hide not useless element XLS

        var tbl = document.getElementById('table-invoices');
        var wb = XLSX.utils.table_to_book(tbl, {
            sheet: "Invoice list table",
            display: true
        });

        var wbout = XLSX.write(wb, {bookType: "xlsx", bookSST: true, type: "binary"});
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        };
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'invoice_list.xlsx');
        
    }

    clearFilter = () => {
        this.creationDate.value = "";
        this.receiveDate.value = "";
        this.searchInput = this.inputSearch.value = "";
        this.selets = document.querySelectorAll("select");
        this.selets.forEach(item => item.value = "");
        this.container = document.getElementById("table-list");
        this.container.innerHTML = "";
        this.containerPages.innerHTML = "";

        this.countNextPage(this.ArrayLIst, this.InvoiceNumbers[0]);
        this.documentsStatus();
    }

    checkIsEmptyObj = (obj) => {
        for (let key in obj) {
            return false; // wrong
        }
        return true; // is epmty
    }

    dateInRange = (data, first, end) => {
        if (end === false) {
            return +first === +data ? console.log(true) : console.log(false);
        } else {
            return +first <= +data && +data <= +end ? console.log(true) : console.log(false);
        }
        // this.dateInRange(new Date("9/19/2019"), new Date("9/17/2019") , new Date("9/25/2019"));
        // this.dateInRange(new Date("9/19/2019"), new Date("9/17/2019") , false);
    }

    filterList = async () => {
        // Loading GIF appear and scroll off
        this.loadingGif.style.display = "flex";
        document.body.classList.add("modal-open");
        //  

        this.filter = {};
        this.status = document.querySelector("#filterStatus").value;
        this.bank = this.bankFilter.value;
        this.merchant = this.merchFilter.value;
        this.documents = document.querySelector("#filterDocuments").value;

        // Додаємо критеріє відбору в об"єкт
        this.status ? this.filter.status = this.status : "";
        this.bank ? this.filter.bank = this.bank : "";
        this.merchant ? this.filter.merchant = this.merchant : "";

        // }) // Знайти всі документи в яких id = "Approved"
        const Approved = { 
            "documents.id": {"$elemMatch": {"status":"Approved"}},
            "documents.payment_proof": {"$elemMatch": { "status":"Approved"}},
            "documents.utility_bill": {"$elemMatch": {"status":"Approved" }},
            "documents.declaration": {"$elemMatch": {"status":"Approved"}}};

        // Знайти всі документи в яких хоча б один "Non-Verified"
        const non_ver = { $or: [
            {"documents.id": {"$elemMatch": {"status":"Non-Verified"}}},
            {"documents.payment_proof": {"$elemMatch": { "status":"Non-Verified"}}},
            {"documents.utility_bill": {"$elemMatch": { "status":"Non-Verified"}}},
            {"documents.declaration": {"$elemMatch": {"status":"Non-Verified"}}}
            
        ]};
        // Знайти всі документи в яких хоча б один EMPTY
        const empty = { $or: [
            {"documents.id": { $exists: true}, "documents.id" :{$size: 0}},
            {"documents.payment_proof": { $exists: true}, "documents.payment_proof" :{$size: 0}},
            {"documents.utility_bill": { $exists: true}, "documents.utility_bill" :{$size: 0}},
            {"documents.declaration": { $exists: true}, "documents.declaration" :{$size: 0}}
            
        ]};

        // Перевірка на дату створення START.
        this.firstCreat = "";
        this.secondCreat = "";

        if(this.creationDate.value.length > 20){
            var DATE = this.creationDate.value.split("—");
            this.firstCreat = new Date(DATE[0].trim());
            this.secondCreat = new Date(DATE[1].trim());

        } else if(this.creationDate.value.length <= 12 && this.creationDate.value.length !== 0){
            var DATE = this.creationDate.value;
            this.firstCreat = new Date(DATE.trim());
            this.secondCreat = false;
        }
        // Перевірка на дату створення END.

        this.firstRec = "";
        this.secondRec = "";

        // Checking Received Date START.
        if(this.receiveDate.value.length > 20){
            var DATE = this.receiveDate.value.split("—");
            this.firstRec = new Date(DATE[0].trim());
            this.secondRec = new Date(DATE[1].trim());

        } else if(this.receiveDate.value.length <= 12 && this.receiveDate.value.length !== 0){
            var DATE = this.receiveDate.value;
            this.firstRec = new Date(DATE.trim());
            this.secondRec = false;
        }
        // Checking Received Date END.

        if(this.documents !== ""){
            this.documents.trim() === "All verified" ? Object.assign(this.filter, Approved): "";
            this.documents.trim() === "Pending verification" ? Object.assign(this.filter, non_ver): "";
            this.documents.trim() === "Without documents" ? Object.assign(this.filter, empty): "";
        }

        const lengthInvoice = await this.getNumberOfinvoices(this.filter, this.firstCreat, this.secondCreat, this.firstRec, this.secondRec);
        const filterList = await this.getInvoices(0, this.filter, this.firstCreat, this.secondCreat, this.firstRec, this.secondRec);

        // Loading GIF appear and scroll off
        this.loadingGif.style.display = "none";
        document.body.classList.remove("modal-open");
        //  

        // Table cleaning
        this.container = document.getElementById("table-list");
        this.container.innerHTML = "";
        this.containerPages.innerHTML = "";

        this.countNextPage(filterList, lengthInvoice.numbers);
    }

    documentsStatus = () => {
        this.ArrayLIst.forEach((obj) => {
            var ID = obj.documents.id;
            var Utility_bill = obj.documents.utility_bill;
            var Paymant_proof = obj.documents.payment_proof;
            var Declaration = obj.documents.declaration;

                function check(arr) {
                    if(arr.length === 1){
                        return arr[0].status;

                    } else if (arr.length > 1) {
                        var check = [];
                        arr.forEach((item) => check.push(item.status));

                        var approved = check.some((el) => el === "Approved");
                        var non_verAll = check.every((el) => el === "Non-Verified");
                        var declinedAll = check.every((el) => el === "Declined");
                        var non_verOne = check.some((el) => el === "Non-Verified");
                        var declinedOne = check.some((el) => el === "Declined");

                            if (approved === true) {
                                return "Approved";

                            } else if (declinedAll === true) {
                                return "Declined";

                            } else if (non_verAll === true) {
                                return "Non-Verified";

                            } else if (non_verOne === true && declinedOne === true && approved === false) {
                                return "Non-Verified";
                            } else {
                                return "Empty";
                            }

                    } else if (arr.length === 0 || arr.length === undefined) {
                        return "Empty";
                    }
                };

            var result = [];
            result.push(check(ID), check(Utility_bill), check(Paymant_proof), check(Declaration));
            var approvedRes = result.every((item) => item === "Approved");
            var emptyRes = result.some((item) => item === "Empty");
            var non_verRes = result.some((item) => item === "Non-Verified");

            if (approvedRes === true) {
                obj.filter_status = "All verified";

            } else if (emptyRes === true) {
                obj.filter_status = "Without documents";

            } else if (non_verRes === true) {
                obj.filter_status = "Pending verification";
            }
        });
    }

    checkDocuments = (doc) => {
        if(doc.length === 1) {
            doc[0].status === undefined ? doc = "" : doc = doc[0].status;

        } else if(doc.length === 0){
            doc = "";

        } else if(doc.length > 1) {
            var check = [];
            doc.forEach((item) => check.push(item.status));

            var declined = check.every((item) => item === "Declined");
            if (declined === false) {
                var result = check.some(item => item === "Approved");
                result === true ? doc = "Approved" : doc = "Non-Verified";
            } else {
                doc = "Declined";
            }
        } 
        // Drawing docs images
            if(doc === "Approved"){
                return doc = `<i class="far fa-check-circle"></i>`;
            } else if(doc === "Declined"){
                return doc = `<i class="far fa-times-circle"></i>`;
            } else if(doc === "Non-Verified"){
                return doc = `<i class="far fa-question-circle"></i>`;
            } else if(doc === ""){
                return doc = `<img src="img/img_3975.png" alt="empty" width="20px" height="10px">`;
            }
    }

    checkClickedPages = (event) => {
        this.buttonsPage = document.querySelectorAll(".nextPage-btn");
        this.buttonsPage.forEach((btn) => {
            event === +(btn.textContent) ? btn.classList.add("highlight") : btn.classList.remove("highlight");;
        });
    };

    renderNextPage = (page) => {
        this.buttonNext = document.createElement("button");
        this.buttonNext.textContent = page;
        this.buttonNext.classList.add("nextPage-btn");
        this.containerPages.appendChild(this.buttonNext);
    }

    countNextPage = (arr, numbersOfpages) => {
        this.loadInvoices(arr);
        var lastPage = numbersOfpages / 10;

        if (lastPage > 3) {
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

        if (!arr.length) return "";
        
        var buttonsPage = document.querySelectorAll(".nextPage-btn");
        buttonsPage[0].classList.add("highlight");
        buttonsPage.forEach((btn) => {
            
            btn.addEventListener("click", async (event) => {
                // Loading GIF appear and scroll off
                this.loadingGif.style.display = "flex";
                document.body.classList.add("modal-open");
                //  

                let currentEvent = +(event.target.textContent);

                let listNumber = ((currentEvent*10)-10);

                this.nextList = await this.getInvoices(listNumber, this.filter, this.firstCreat, this.secondCreat, this.firstRec, this.secondRec);

                // Loading GIF remove and scroll off
                this.loadingGif.style.display = "none";
                document.body.classList.remove("modal-open");
                //  
                
                this.container = document.getElementById("table-list");
                this.container.innerHTML = "";

                this.loadInvoices(this.nextList);

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
                
                this.checkClickedPages(currentEvent);
            });
        });
        this.firstPage.style.display = "flex";
    }

    getMerchants = async () => {
        return  await fetch("http://18.216.223.81:3000/getMerchants")
        .then(res => {
            return res.json();
        }) 
        .catch(err => {
            console.log(err);
        });
   }

    saveLocakBanksAndMerchants = async () => {
        this.arrayBanks = await this.getBanks();
        this.arrayBanks.forEach((bank) => this.ArrayBanks.push(bank));

        this.arrayMerch = await this.getMerchants();
        this.arrayMerch.forEach((merchant) => this.ArrayMerchants.push(merchant));
        this.filtersData();
    }

    getBanks = async () => {
         return  await fetch("http://18.216.223.81:3000/getBanks")
         .then(res => {
             return res.json();
         }) 
         .catch(err => {
             console.log(err);
         });
    }

    saveLocalInvoices = async () => {
        // Отримуємо кількість інвойсів та записуємо їх в глобальну змінну. 
        this.number = await this.getNumberOfinvoices();
        this.InvoiceNumbers.push(this.number.numbers);

        this.array = await this.getInvoices(0);
        this.array.forEach((item) => {
            this.ArrayLIst.push(item);
        });
        this.countNextPage(this.ArrayLIst, this.InvoiceNumbers[0]);
        this.documentsStatus();
    }

    getInvoices = async (count, filter, firstCr, secondCr, firstRe, secondRe) => {
        return  await fetch("http://18.216.223.81:3000/getPart-Invoices", {
            method: "POST",
            body: JSON.stringify({
                numbers: count, 
                filter,
                firstCr: firstCr,
                secondCr: secondCr,
                firstRe: firstRe,
                secondRe: secondRe
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

    getNumberOfinvoices = async (filter, firstCr, secondCr, firstRe, secondRe) => {
       return  await fetch("http://18.216.223.81:3000/getNumber-Invoices", {
            method: "POST",
            body: JSON.stringify({
                filter,
                firstCr: firstCr,
                secondCr: secondCr,
                firstRe: firstRe,
                secondRe: secondRe
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

    checkDate = (data) => {
        return data === "" || !data ? data = "mm/dd/yyyy" : data = moment(data).format('ll');
    }

    loadInvoices = (Arr) => {
        // Loading gif and modal scroll
        this.loadingGif.style.display = "none";
        document.body.classList.remove("modal-open");

        this.container = document.getElementById("table-list");
        Arr.forEach((item) => {
            var currency = ""; item.currency === "EUR" ? currency = "€" : currency = "$";
            var color = "";
            var emptyImg = `<img src="img/img_3975.png" alt="empty" width="20px" height="10px">`;
            item.status === "Approved" ? color = "approved" : "";
            item.status === "Declined" ? color = "red" : "";
            item.status === "Received" ? color = "blue" : "";
            item.status === "Sent" ? color = "yellow" : "";
            item.status === "Available" ? color = "green" : "";

            var docs = "documents" in item;

            this.userList = document.createElement("tr");
            this.userList.innerHTML =  `
                    <td class="column1 view">
                        <div class="createdTd">
                            <p class="green"><b class="number">#${item.number}</b></p>
                            <p class="smallBoldText">${this.checkDate(item.dates.creation_date)}</p>
                            <p>${moment(item.dates.creation_date).format("h:mm a")}</p>
                        </div>
                    </td> 
                    <td class="column2 view">
                        ${item.merchant}
                    </td> 
                    <td class="column3 view">${item.client_details.full_name}</td> 
                    <td class="column4 view">
                        <div class="sentTd">
                            <p>${currency}${item.amount.amount_sent}</p>
                            <p class="yellow smallBoldText">${this.checkDate(item.dates.sent_date)}</p>
                        </div>
                    </td> 
                    <td class="column5 view">${""}</td>
                    <td class="column6 view">
                        <div>
                            <p>${currency}${item.amount.amount_received}</p>
                            <p class="blue smallBoldText">${this.checkDate(item.dates.received_date)}</p>
                        </div>
                    </td>
                    <td class="column7 view">${item.bank}</td>
                    <td class="column8 view">
                        <p>${currency}${0}</p>
                        <p class="fiolet smallBoldText">${this.checkDate(item.dates.available_date)}</p>
                    </td>
                    <td class="column9 ${color} view"><strong>${item.status}</strong></td>
                    <td class="column10">
                        <div class="documentsIcon">
                            <div>ID: ${docs === false ? emptyImg : this.checkDocuments(item.documents.id)}</div>
                            <div>Utility Bill: ${docs === false ? emptyImg : this.checkDocuments(item.documents.utility_bill)}</div>
                            <div>Payment proof: ${docs === false ? emptyImg : this.checkDocuments(item.documents.payment_proof)}</div>
                            <div>Declaration: ${docs === false ? emptyImg : this.checkDocuments(item.documents.declaration)}</div>
                        </div>
                    </td>
                    <td class="column11">
                        <div class="previewIcons">
                            <i class="fas fa-file-alt"></i>
                            <i class="fas fa-file-signature"></i>
                            <i class="fas fa-file-invoice-dollar"></i>
                        </div>
                    </td>
                    <td class="column12">
                        <button target="_blank" class="previewBtn">Preview</button>
                    </td>
            `;
        this.container.appendChild(this.userList);
        });
        this.buttonsPreview = document.querySelectorAll(".previewBtn");
        this.buttonsPreview.forEach((btn) => btn.addEventListener("click", this.previewInvoice));
        this.viewInvoice();
    }

    render(){
        this.saveLocalInvoices();
        this.saveLocakBanksAndMerchants();
        this.showFilterBtn.addEventListener("click", this.filterList);
        this.clearFilterBtn.addEventListener("click", this.clearFilter);
        this.btnExel.addEventListener("click", this.saveXls);
        this.btn_search.addEventListener("click", this.searchFunction);
        this.addCommentBtn.addEventListener("click", this.addCommentForBtn);
        this.firstPageImg.addEventListener("click", this.clearFilter);
        this.editInvoiceBtn.addEventListener("click", this.editInvoice);
        this.saveEditedInvoice_btn.addEventListener("click", this.saveEditedInvoice);
        this.uploadBtn.addEventListener("click", this.initialUpload);
        this.clickToDownload.addEventListener("input", this.changeFileClickTo);

        this.textAreaAddComment.addEventListener("keyup", () => {
            event.preventDefault();
            event.keyCode === 13 ? this.addCommentForBtn() : "";
        });

        this.inputSearch.addEventListener("keyup", () => {
            event.preventDefault();
            event.keyCode === 13 ? this.searchFunction() : "";
        });

        this.requestedBtn.addEventListener("click", this.requestedStatus);
        this.sentBtn.addEventListener("click", this.initialSentStatus);
        this.receivedBtn.addEventListener("click", this.initialReceivedStatus);
        this.receivedBtnSubmit.addEventListener("click", this.receiveStatus);
        this.approvedBtn.addEventListener("click", this.approvedStatus);
        this.approvedBtnSubmit.addEventListener("click", this.approvedStatusInit);
    }
};

const userList = new invoiceList();

// Alert modal window
const alertWindow = document.querySelector('.alert');
if (alertWindow) {
    alertWindow.addEventListener("click", (event) => {
        event.target === alertWindow ? alertWindow.style.display = "none" : "";
    });
};
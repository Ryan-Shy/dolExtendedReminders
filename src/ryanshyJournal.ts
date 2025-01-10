var dolExtendedReminders: DolExtendedReminders = globalThis.dolExtendedReminders ?? {};
dolExtendedReminders.journal = dolExtendedReminders.journal ?? {};

/*
 * Journal
 */
dolExtendedReminders.journal.AddJournal = function () {
    if (!(dolExtendedReminders.settings?.showDaily ?? true) && !(dolExtendedReminders.settings?.showWeekly ?? true)) {
        return;
    }
    if (!dolExtendedReminders.createCW || !dolExtendedReminders.createCW()) {
        return;
    }
    if (!globalThis.cw) {
        return;
    }
    const cw = globalThis.cw;
    const journalMaps = cw.document.getElementsByClassName("map");
    if (!journalMaps || journalMaps.length < 1) {
        return;
    }
    const journalMap = journalMaps[0];
    // Add extended reminders
    const newDiv = cw.document.createElement("div");
    newDiv.id = "ryanshy-extended-reminders";
    journalMap.insertAdjacentElement("afterend", newDiv);
    // Add horizontal line
    const hr = cw.document.createElement("hr");
    newDiv.insertAdjacentElement("beforebegin", hr);

    if (dolExtendedReminders.settings?.showDaily ?? true) {
        // Add daily reminders
        const dailyHeader = cw.document.createElement("h1");
        dailyHeader.className = "header gold bold";
        dailyHeader.innerText = "Daily Activities";
        newDiv.appendChild(dailyHeader);
        const dailyList = cw.document.createElement("ul");
        dailyList.id = "ryanshy-extended-daily-reminders";
        dailyList.className = "journal";
        newDiv.appendChild(dailyList);
        if (dolExtendedReminders.journal?.AddDaily) {
            dolExtendedReminders.journal.AddDaily();
        }
    }
    if ((dolExtendedReminders.settings?.showDaily ?? true) && (dolExtendedReminders.settings?.showWeekly ?? true)) {
        // Add horizontal line
        newDiv.appendChild(cw.document.createElement("hr"));
    }

    if (dolExtendedReminders.settings?.showWeekly ?? true) {
        // Add weekly reminders
        const weeklyHeader = cw.document.createElement("h1");
        weeklyHeader.className = "header gold bold";
        weeklyHeader.innerText = "Weekly Activities";
        newDiv.appendChild(weeklyHeader);
        const weeklyList = cw.document.createElement("ul");
        weeklyList.id = "ryanshy-extended-weekly-reminders";
        weeklyList.className = "journal";
        newDiv.appendChild(weeklyList);
        if (dolExtendedReminders.journal?.AddWeekly) {
            dolExtendedReminders.journal.AddWeekly();
        }
    }
}

dolExtendedReminders.journal.AddDaily = function () {
    console.log("Adding Daily Reminders");
    if (!dolExtendedReminders.journal?.dailyList) {
        return;
    }
    if (!dolExtendedReminders.createCW || !dolExtendedReminders.createCW()) {
        return;
    }
    if (!globalThis.cw) {
        return;
    }
    const cw = globalThis.cw;
    const list = cw.document.getElementById("ryanshy-extended-daily-reminders");
    if (!list) {
        return;
    }
    // general items
    const options = dolExtendedReminders.journal?.dailyList
    .filter((item) => {return item.parent === ""})
    .sort((a, b) => a.name.localeCompare(b.name));
    for (const option of options) {
        if (option.hasRequirementMet()) {
            // add
            const li = cw.document.createElement("li");
            const done = ((option.isDone())
                ? '<span class="green">done</span>'
                : '<span class="gold">available</span>')
            li.innerHTML = `${option.name} ${done}`;
            list.appendChild(li);
        }
    }
}

dolExtendedReminders.journal.AddWeekly = function () {
    console.log("Adding Weekly Reminders");
    if (!dolExtendedReminders.journal?.weeklyList) {
        return;
    }
    if (!dolExtendedReminders.createCW || !dolExtendedReminders.createCW()) {
        return;
    }
    if (!globalThis.cw) {
        return;
    }
    const cw = globalThis.cw;
    const list = cw.document.getElementById("ryanshy-extended-weekly-reminders");
    if (!list) {
        return;
    }
    // general items
    const options = dolExtendedReminders.journal.weeklyList
    .filter((item) => {return item.parent === ""})
    .sort((a, b) => a.name.localeCompare(b.name));
    for (const option of options) {
        if (option.hasRequirementMet()) {
            // add
            const li = cw.document.createElement("li");
            const done = ((option.isDone())
                ? '<span class="green">done</span>'
                : '<span class="gold">available</span>')
            li.innerHTML = `${option.name} ${done}`;
            list.appendChild(li);
        }
    }
    if (dolExtendedReminders.settings?.showAntiques ?? true) {
        // need special list for antiques
        const antiqueListItem = cw.document.createElement("li");
        antiqueListItem.style.paddingTop = "6px"
        list.appendChild(antiqueListItem);
        const antiqueDiv = cw.document.createElement("div");
        antiqueListItem.appendChild(antiqueDiv);
        const antiqueHeader = cw.document.createElement("span");
        antiqueHeader.innerText = "You can collect antiques:";
        antiqueDiv.appendChild(antiqueHeader);
        const antiqueList = cw.document.createElement("ul");
        antiqueDiv.appendChild(antiqueList);
        const antiqueOptions = dolExtendedReminders.journal.weeklyList
        .filter((item) => {return item.parent === "antique"})
        .sort((a, b) => a.name.localeCompare(b.name));
        for (const option of antiqueOptions) {
            if (option.hasRequirementMet()) {
                // add
                const li = cw.document.createElement("li");
                const done = ((option.isDone())
                    ? '<span class="green">done</span>'
                    : '<span class="gold">available</span>')
                li.innerHTML = `${option.name} ${done}`;
                antiqueList.appendChild(li);
            }
        }
    }
    if (dolExtendedReminders.settings?.showVendingMachine ?? true) {
        // need special list for Vending Machine
        const vmOptions = dolExtendedReminders.journal.weeklyList
        .filter((item) => {return item.parent === "brothelVM"})
        .filter((item) => {return item.hasRequirementMet()})
        .sort((a, b) => a.name.localeCompare(b.name));
        if (vmOptions.length >= 1) {
            const vmListItem = cw.document.createElement("li");
            vmListItem.style.paddingTop = "6px"
            list.appendChild(vmListItem);
            const vmDiv = cw.document.createElement("div");
            vmListItem.appendChild(vmDiv);
            const vmHeader = cw.document.createElement("span");
            vmHeader.innerText = "You have can tend to your Vending Machine:";
            vmDiv.appendChild(vmHeader);
            const vmList = cw.document.createElement("ul");
            vmDiv.appendChild(vmList);
            for (const option of vmOptions) {
                if (option.hasRequirementMet()) {
                    // add
                    const li = cw.document.createElement("li");
                    const done = ((option.isDone())
                        ? '<span class="green">done</span>'
                        : '<span class="gold">available</span>')
                    li.innerHTML = `${option.name} ${done}`;
                    if (option.getDetails) {
                        li.innerHTML += option.getDetails();
                    }
                    vmList.appendChild(li);
                }
            }
        }
    }
    if (dolExtendedReminders.settings?.showThievery ?? true) {
        // need special list for theft
        const theftListItem = cw.document.createElement("li");
        theftListItem.style.paddingTop = "6px";
        list.appendChild(theftListItem);
        const theftDiv = cw.document.createElement("div");
        theftListItem.appendChild(theftDiv);
        const theftHeader = cw.document.createElement("span");
        theftHeader.innerText = "You can commit thievery:";
        theftDiv.appendChild(theftHeader);
        const theftList = cw.document.createElement("ul");
        theftDiv.appendChild(theftList);
        const theftOptions = dolExtendedReminders.journal.weeklyList
        .filter((item) => {return item.parent === "theft"})
        .sort((a, b) => a.name.localeCompare(b.name));
        for (const option of theftOptions) {
            if (option.hasRequirementMet()) {
                // add
                const li = cw.document.createElement("li");
                const done = ((option.isDone())
                    ? '<span class="green">done</span>'
                    : '<span class="gold">available</span>')
                li.innerHTML = `${option.name} ${done}`;
                theftList.appendChild(li);
            }
        }
    }
}

dolExtendedReminders.journal.genericCheck = function (id: string, type: "daily" | "weekly" | "", checkMethod: (value: any) => boolean, parent: string = "") {
    if (!dolExtendedReminders.createCW || !dolExtendedReminders.createCW()) {
        return false;
    }
    if (!globalThis.cw) {
        return false;
    }
    const cw = globalThis.cw;
    if (!cw.V) {
        return false;
    }
    if (type === "") {
        if (typeof parent !== "undefined" && parent !== "") {
            const dict = cw.V[parent];
            if (!dict) return false;
            const value = dict[id];
            return checkMethod(value);
        } else {
            const value = cw.V[id];
            return checkMethod(value);
        }
    } else if (typeof parent !== "undefined" && parent !== "") {
        const dict = cw.V[type][parent];
        if (!dict) return false;
        const value = dict[id];
        return checkMethod(value);
    } else {
        const value = cw.V[type][id];
        return checkMethod(value);
    }
}

dolExtendedReminders.journal.dailyList = [
    {
        name: "",
        parent: "",
        isDone: () => {return false},
        hasRequirementMet: () => {return false},
    },
    {
        name: "Hookah Parlour",
        parent: "",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("hookah", "daily", (value) => value === 1);
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("hookah_state", "", (value) => value === 1 || value === 3);},
    },
    /*
     * TODO LIST:
     * - massAttended
     * - masonSpoken
     * - masonLake
     * - lakeMeditate
     * - estateDone / estateBluffed
     * - thicketBlackberries
     * - cafeEaten
     * - compoundState
     * - yogaWillpower
     * - hookah
     * - stallRented
     * - confessed
     * - templePray
     */
];

dolExtendedReminders.journal.weeklyList = [
    {
        name: "",
        parent: "",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return false
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return false
        },
    },
    {
        name: "Trial of Purity",
        parent: "",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("templeFire", "weekly", (value) => !!value);
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("temple_rank", "", (value) => value && value !== "prospective");
        },
    },
    {
        name: "School Night Pool Party",
        parent: "",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("schoolNightPoolParty", "weekly", (value) => value === false);
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("schoolNightPoolParty", "weekly", (value) => !!value);
        },
    },
    {
        name: "Dance Job",
        parent: "",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("danceJob", "weekly", (value) => value && value === "done");
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("dance_job_intro", "", (value) => !!value);
        },
    },
    {
        name: "Brothel Escort Job",
        parent: "",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("escortjob", "weekly", (value) => !!value);
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("intro", "", (value) => !!value && value === 2, "brothelshowdata");
        },
    },
    {
        name: "Demonstrate Wooden Horse",
        parent: "",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("museumhorse", "", (value) => !!value);
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("museumhorseintro", "", (value) => !!value);
        },
    },
    {
        name: "Demonstrate Ducking Stool",
        parent: "",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("museumduck", "", (value) => !!value);
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("museumduckintro", "", (value) => !!value);
        },
    },
    {
        name: "Photo Shoot",
        parent: "",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("shoot", "", (value) => value === 1, "photo");
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("photo_known", "", (value) => value && value >= 2);
        },
    },
    {
        name: "Pepper Spray Lab",
        parent: "",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("loft_spray", "", (value) => !!value);
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.createCW || !dolExtendedReminders.createCW()) {
                return false;
            }
            if (!globalThis.cw) {
                return false;
            }
            const cw = globalThis.cw;
            if (!cw.V) {
                return false;
            }
            const spray = cw.V['spray'];
            const spraymax = cw.V["spraymax"];
            if (typeof spray !== "number" || typeof spraymax !== "number" || spray >= spraymax) {
                return false;
            }
            return !!cw.V['loft_kylar'];
        },
    },
    // Brothel Vending Machine
    {
        name: "Collect Money from Vending Machine",
        parent: "brothelVM",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("brothelVMCollect", "weekly", (value) => !!value);
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("status", "", (value) => !!value && value === "set", "brothelVending");
        },
    },
    {
        name: "Fill up Lube in the Vending Machine",
        parent: "brothelVM",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("brothelVMLube", "weekly", (value) => !!value);
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("products", "", (value) => typeof value === "number" && value >= 2, "brothelVending");
        },
        getDetails: () => {
            if (!dolExtendedReminders.createCW || !dolExtendedReminders.createCW()) {
                return "";
            }
            if (!globalThis.cw) {
                return "";
            }
            const cw = globalThis.cw;
            if (!cw.V) {
                return "";
            }
            const vm = cw.V['brothelVending'];
            if (!vm) {
                return "";
            }
            const amount = vm['lubeToRefill']
            let amountString = '';
            if (amount < 10) amountString = '<span class="green">no</span>';
            else if (amount < 25) amountString = '<span class="teal">very little</span>';
            else if (amount < 50) amountString = '<span class="lblue">a small amount of</span>';
            else if (amount < 100) amountString = '<span class="blue">some</span>';
            else if (amount < 150) amountString = '<span class="purple">a significant amount of</span>';
            else if (amount < 200) amountString = '<span class="pink">a great deal of</span>';
            else amountString = '<span class="red">all of it\'s</span>';
            return `<br>The machine is in need of ${amountString} lube.`;
        },
    },
    {
        name: "Fill up Condoms in the Vending Machine",
        parent: "brothelVM",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("brothelVMCondoms", "weekly", (value) => !!value);
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("products", "", (value) => typeof value === "number" && value % 2 === 1, "brothelVending");
        },
        getDetails: () => {
            if (!dolExtendedReminders.createCW || !dolExtendedReminders.createCW()) {
                return "";
            }
            if (!globalThis.cw) {
                return "";
            }
            const cw = globalThis.cw;
            if (!cw.V) {
                return "";
            }
            const vm = cw.V['brothelVending'];
            if (!vm) {
                return "";
            }
            const amount = vm['condomsToRefill']
            let amountString = '';
            if (amount < 10) amountString = '<span class="green">no</span>';
            else if (amount < 25) amountString = '<span class="teal">very few</span>';
            else if (amount < 50) amountString = '<span class="lblue">a small amount of</span>';
            else if (amount < 100) amountString = '<span class="blue">some</span>';
            else if (amount < 150) amountString = '<span class="purple">a significant amount of</span>';
            else if (amount < 200) amountString = '<span class="pink">a great number of</span>';
            else amountString = '<span class="red">all of it\'s</span>';
            return `<br>The machine is in need of ${amountString} condoms.`;
        },
    },
    // Thievery
    {
        name: "Dance Studio",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("danceStudio", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    {
        name: "Ocean Breeze Cafe",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("oceanBreeze", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    {
        name: "Strip Club",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("stripClub", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    {
        name: "Clothing Shop",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("clothingShop", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    {
        name: "Adult Shop",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("adultShop", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    {
        name: "Hairdressers",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("hairDressers", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    {
        name: "Tailor",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("tailor", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    {
        name: "Pet Shop",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("petShop", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    {
        name: "Toy Shop",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("toyShop", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    {
        name: "Tattoo Parlour",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("tattooParlour", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    {
        name: "Riding School",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("ridingSchool", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    {
        name: "Spa",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("spa", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    {
        name: "School Library",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("schoolLibraryMoney", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    {
        name: "Infirmary",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("infirmaryDrugs", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    {
        name: "Furniture Shop",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("furnitureShop", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    {
        name: "Supermarket",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("supermarket", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    {
        name: "Pub",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("pub", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    {
        name: "Cosmetics Shop",
        parent: "theft",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("", "weekly", (value) => !!value, "theft");
        },
        hasRequirementMet: () => {return true},
    },
    // Antiques
    {
        name: "Arousing Crystal",
        parent: "antique",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("antiqueCrystal", "weekly", (value) => !!value, "sewers");
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("antiques", "", (value) => {
                if (!value) return false;
                const museum = value["antiquecrystal"];
                return museum != "notFound";
            }, "museumAntiques");
        },
    },
    {
        name: "Old Watch",
        parent: "antique",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("antiqueWatch", "weekly", (value) => !!value, "sewers");
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("antiques", "", (value) => {
                if (!value) return false;
                const museum = value["antiquewatch"];
                return museum != "notFound";
            }, "museumAntiques");
        },
    },
    {
        name: "Odd Medical Aid",
        parent: "antique",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("antiqueDildo", "weekly", (value) => !!value, "sewers");
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("antiques", "", (value) => {
                if (!value) return false;
                const museum = value["antiquedildo"];
                return museum != "notFound";
            }, "museumAntiques");
        },
    },
    {
        name: "Noble Candle Stick",
        parent: "antique",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("antiqueCandlestick", "weekly", (value) => !!value, "sewers");
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("antiques", "", (value) => {
                if (!value) return false;
                const museum = value["antiquecandlestick"];
                return museum != "notFound";
            }, "museumAntiques");
        },
    },
    {
        name: "Hunting Horn",
        parent: "antique",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("antiqueHorn", "weekly", (value) => !!value, "sewers");
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("antiques", "", (value) => {
                if (!value) return false;
                const museum = value["antiquehorn"];
                return museum != "notFound";
            }, "museumAntiques");
        },
    },
    {
        name: "Silver Compass",
        parent: "antique",
        isDone: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("beachCaveCompass", "weekly", (value) => !!value);
        },
        hasRequirementMet: () => {
            if (!dolExtendedReminders.journal?.genericCheck) return false;
            return dolExtendedReminders.journal.genericCheck("antiques", "", (value) => {
                if (!value) return false;
                const museum = value["antiquesilvercompass"];
                return museum != "notFound";
            }, "museumAntiques");
        },
    },
];

dolExtendedReminders.journal
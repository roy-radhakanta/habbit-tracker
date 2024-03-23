/**
 * @var Main
 */

function Habit() {
  this.loader = "/images/loading.svg";
  this.addHabitButton = Main.select("#addHabitButton")
    ? Main.select("#addHabitButton")
    : null;
  this.addHabitButtonImg = Main.select("#addHabitButtonImg")
    ? Main.select("#addHabitButtonImg")
    : null;
  this.addHabitButtonIcon = "/images/add-icon.svg";
  this.noHabitFoundContainer = Main.select("#noHabitFoundContainer")
    ? Main.select("#noHabitFoundContainer")
    : null;
  this.habitDoneButton = Main.selectAll(".actionButton").length
    ? Main.selectAll(".actionButton")
    : null;

  this.closeHabitButton = Main.select("#closeAddHabitButton")
    ? Main.select("#closeAddHabitButton")
    : null;
  this.addNewHabitModal = Main.select("#add-new-habit-modal")
    ? Main.select("#add-new-habit-modal")
    : null;
  this.submitAddHabitButton = Main.select("#submitAddHabitButton")
    ? Main.select("#submitAddHabitButton")
    : null;
  this.newHabitForm = Main.select("#newHabitForm")
    ? Main.select("#newHabitForm")
    : null;
  this.habitStatusButtons = Main.selectAll(".habitStatus").length
    ? Main.selectAll(".habitStatus")
    : null;
}

Habit.prototype.init = function () {
  const self = this;
  if (this.addHabitButtonImg) {
    this.addHabitButtonImg.src = this.addHabitButtonIcon;
  }
  if (this.addHabitButton) {
    this.addHabitButton.addEventListener("click", function (e) {
      Habit.showAddHabitModal(e, self);
    });
  }
  if (this.closeHabitButton) {
    this.closeHabitButton.addEventListener("click", function (e) {
      Habit.closeAddHabitModal(e, self);
    });
  }
  if (this.newHabitForm) {
    this.newHabitForm.addEventListener("submit", function (e) {
      Habit.saveHabit(e, self);
    });
  }
  if (this.habitDoneButton) {
    this.habitDoneButton.forEach(function (hdb) {
      hdb.addEventListener(
        "click",
        function (e) {
          Habit.habitDone(e, self);
        },
        true
      );
    });
  }
  if (this.habitStatusButtons) {
    this.habitStatusButtons.forEach(function (hsB) {
      hsB.addEventListener(
        "click",
        function (e) {
          Habit.habitDone(e, self);
        },
        true
      );
    });
  }
};

Habit.showAddHabitModal = function (e, self) {
  if (self.addNewHabitModal) {
    self.addNewHabitModal.classList.add("active");
    if (self.addHabitButtonImg) {
      self.addHabitButtonImg.src = self.loader;
    }
  }
};

Habit.closeAddHabitModal = function (e, self) {
  if (self.addNewHabitModal) {
    self.addNewHabitModal.classList.remove("active");
    if (self.addHabitButtonImg) {
      self.addHabitButtonImg.src = self.addHabitButtonIcon;
    }
  }
};

Habit.saveHabit = function (e, self) {
  Main.select(".add-new-habit-modal__body").classList.add("loading");
  e.preventDefault();
  const habitData = new FormData(e.target);
  Main.ajax({
    method: "POST",
    async: true,
    headerContentType: "Content-type",
    contentType: "application/x-www-form-urlencoded",
    url: "/habit/addnew",
    sendData: `habit=${habitData.get("habit")}`,
    callBack: Habit.habitSaved,
    self: self,
  });
};

Habit.habitSaved = function (res) {
  Main.select(".add-new-habit-modal__body").classList.remove("loading");
  try {
    const responseJson = JSON.parse(res);
    if (!responseJson.status) {
      Toastify({
        text: responseJson.msg,
        duration: 3000,
        destination: "/",
        newWindow: false,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #ff0000, #007bff)",
        },
      }).showToast();
    } else {
      Toastify({
        text: responseJson.msg,
        duration: 3000,
        destination: "/",
        newWindow: false,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    }
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } catch (error) {
    Toastify({
      text: "Somthing went wrong! refresh the page and try again now",
      duration: 3000,
      destination: "/",
      newWindow: false,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #ff0000, #007bff)",
      },
    }).showToast();
    return;
  }
};

Habit.habitDone = function (e, self) {
  let habitID = e.target.dataset.h;
  let habitAction = e.target.dataset.a;
  let habitDate = e.target.dataset?.d;
  let targetElement = e.target;
  if (targetElement.tagName === "IMG") {
    targetElement = e.target.parentNode;
  }
  if (!habitID) {
    habitID = targetElement.dataset.h;
  }
  if (!habitAction) {
    habitAction = targetElement.dataset.a;
  }
  let sendData = `hid=${habitID}&status=${habitAction}`;
  if (habitDate) {
    sendData = sendData + "&date=" + habitDate;
  }

  targetElement.classList.add("loader", "loading");
  Main.ajax({
    method: "POST",
    async: true,
    headerContentType: "Content-type",
    contentType: "application/x-www-form-urlencoded",
    url: "/habit/update",
    sendData: sendData,
    callBack: Habit.habitDoneRes,
    button: targetElement,
  });
};

Habit.habitDoneRes = function (res) {
  this.button.classList.remove("loader", "loading");
  try {
    const jsonResponse = JSON.parse(res);
    if (!jsonResponse.status) {
      Toastify({
        text: jsonResponse.msg,
        duration: 3000,
        destination: "/",
        newWindow: false,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #ff0000, #007bff)",
        },
      }).showToast();
    } else {
      Toastify({
        text: jsonResponse.msg,
        duration: 3000,
        destination: "/",
        newWindow: false,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    }
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } catch (error) {
    Toastify({
      text: "Somthing went wrong! refresh the page and try again now",
      duration: 3000,
      destination: "/",
      newWindow: false,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #ff0000, #007bff)",
      },
    }).showToast();
    return;
  }
};

new Habit().init();

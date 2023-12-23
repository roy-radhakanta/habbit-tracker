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
  this.habitDoneButton = Main.select("#habitDone")
    ? Main.select("#habitDone")
    : null;
  this.habitNotDone = Main.select("#habitNotDone")
    ? Main.select("#habitNotDone")
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
  e.preventDefault();
  const habitData = new FormData(e.target);
  Main.ajax({
    method: "POST",
    async: true,
    headerContentType: "Content-type",
    contentType: "application/x-www-form-urlencoded",
    url: "/habit/addnew",
    sendData: `habit=${habitData.get('habit')}`,
    callBack: Habit.habitSaved,
    self: self,
  });
};

Habit.habitSaved = function (res) {
  console.log(res);
};

new Habit().init();

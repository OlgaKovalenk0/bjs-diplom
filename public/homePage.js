"use strict";

const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

logoutButton.action = function () {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
};

ApiConnector.current(respons => {
    if (respons.success) {
        ProfileWidget.showProfile(respons.data);
    }
});
function getExchangeRate() {
    ApiConnector.getStocks(respons => {
        if (respons.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(respons.data);
        }
    });
}

getExchangeRate();
setInterval(getExchangeRate, 60000);
moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, respons => {
        if (respons.success) {
            ProfileWidget.showProfile(respons.data);
            moneyManager.setMessage(respons.success, "Баланс пополнен");
        }
        else {
            moneyManager.setMessage(respons.success, respons.error);
        }
    });
};
moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, respons => {
        if (respons.success) {
            ProfileWidget.showProfile(respons.data);
            moneyManager.setMessage(respons.success, "Конвертация валют прошла успешно");
        } else {
            moneyManager.setMessage(respons.success, respons.error);
        }
    });
}

moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, respons => {
        if (respons.success) {
            ProfileWidget.showProfile(respons.data);
            moneyManager.setMessage(respons.success, "Баланс пополнен");
        }
        else {
            moneyManager.setMessage(respons.success, respons.error);
        }
    });
};
ApiConnector.getFavorites(respons => {
    if (respons.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(respons.data);
        moneyManager.updateUsersList(respons.data);
    }
});

favoritesWidget.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, respons => {
        if (respons.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(respons.data);
        } else {
            favoritesWidget.setMessage(respons.success, respons.error);
        }
    });
};

favoritesWidget.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites (data, respons => {
        if (respons.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(respons.data);
        } else {
            favoritesWidget.setMessage(respons.success, respons.error);
        }
    });
};
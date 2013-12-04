/*
 *     Copyright (c) 2013 CoNWeT Lab., Universidad Politécnica de Madrid
 *
 *     This file is part of the GeoWidgets Project,
 *
 *     http://conwet.fi.upm.es/geowidgets
 *
 *     Licensed under the GNU General Public License, Version 3.0 (the 
 *     "License"); you may not use this file except in compliance with the 
 *     License.
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     under the License is distributed in the hope that it will be useful, 
 *     but on an "AS IS" BASIS, WITHOUT ANY WARRANTY OR CONDITION,
 *     either express or implied; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *  
 *     See the GNU General Public License for specific language governing
 *     permissions and limitations under the License.
 *
 *     <http://www.gnu.org/licenses/gpl.txt>.
 *
 */

(function () {
    
    "use strict";

    use("conwet");

    conwet.Gadget = Class.create({

        /*This function initializes the list of different Services and loads the 
         * UI of the widget. If the user added services previously it will load this
         * services with the variable services*/
        initialize: function() {

            //The last registered services
            this.servicesPreference = MashupPlatform.widget.getVariable("services");

            //Initial servers if no services where registered before
            this.catalogue = initialServers;

            //If there where services registered before we load them in the catalogue
            if (this.servicesPreference.get() != "") {
                this.catalogue = JSON.parse(this.servicesPreference.get());
            }

            // Init
            this.messageManager = new conwet.ui.MessageManager(3000);
            this.draw();
        },

        //Function that creates the UI
        draw: function() {
            var container = $("container");
            conwet.ui.UIUtils.ignoreEvents(container, ["click", "dblclick"]);

            var lineDiv = document.createElement("div");
            lineDiv.addClassName("lineDiv");

            var typeLabel = document.createElement("div");
            $(typeLabel).addClassName("label");
            typeLabel.appendChild(document.createTextNode(_("Service type:")));
            lineDiv.appendChild(typeLabel);

            this.typeSelect = new StyledElements.StyledSelect();
            this.typeSelect.addEventListener("change", this._updateServiceSelect.bind(this));
            this.typeSelect.insertInto(lineDiv);

            container.appendChild(lineDiv);

            for (var i=0; i< this.catalogue.length; i++) {
                this.typeSelect.addEntries([{label:_(this.catalogue[i].name), value: this.catalogue[i].type}]);
            }

            lineDiv = document.createElement("div");
            lineDiv.addClassName("lineDiv");

            var serviceLabel = document.createElement("div");
            $(serviceLabel).addClassName("label");
            serviceLabel.appendChild(document.createTextNode(_("Service:")));
            lineDiv.appendChild(serviceLabel);

            this.serviceSelect = new StyledElements.StyledSelect();
            this.serviceSelect.addClassName("service");
            this.serviceSelect.insertInto(lineDiv);

            container.appendChild(lineDiv);

            lineDiv = document.createElement("div");
            lineDiv.addClassName("lineDiv");
            lineDiv.addClassName("buttonsDiv");

            var sendButton = conwet.ui.UIUtils.createButton({
                "classNames": ["add_button, button"],
                "title"     : _("Send service"),
                "value"     : _("Send"),
                "onClick"   : this._sendService.bind(this)
            });

            var addButton = conwet.ui.UIUtils.createButton({
                "classNames": ["send_button, button"],
                "title"     : _("Add service"),
                "value"     : _("Add service"),
                "onClick"   : this._showAddServiceDialog.bind(this)
            });

            lineDiv.appendChild(addButton);
            lineDiv.appendChild(sendButton);
            container.appendChild(lineDiv);

            this._updateServiceSelect();

            this.backgroundDialog = document.createElement("div");
            $(this.backgroundDialog).addClassName("dialog_background");
            this.backgroundDialog.addClassName("no_display");
            conwet.ui.UIUtils.ignoreEvents(this.backgroundDialog, ["click", "dblclick"]);
            container.appendChild(this.backgroundDialog);

            this.serviceDialog = document.createElement("div");
            $(this.serviceDialog).addClassName("add_dialog");
            $(this.serviceDialog).addClassName("no_display");
            container.appendChild(this.serviceDialog);

            var nameLabel = document.createElement("div");
            $(nameLabel).addClassName("label");
            nameLabel.appendChild(document.createTextNode(_("Name:")));
            this.serviceDialog.appendChild(nameLabel);

            var nameDiv = document.createElement("div");
            $(nameDiv).addClassName("text");
            this.serviceDialog.appendChild(nameDiv);

            this.nameInput = document.createElement("input");
            this.nameInput.type = "text";
            nameDiv.appendChild(this.nameInput);

            var urlLabel = document.createElement("div");
            $(urlLabel).addClassName("label");
            urlLabel.appendChild(document.createTextNode(_("URL:")));
            this.serviceDialog.appendChild(urlLabel);

            var urlDiv = document.createElement("div");
            $(urlDiv).addClassName("text");
            this.serviceDialog.appendChild(urlDiv);

            this.urlInput = document.createElement("input");
            this.urlInput.type = "text";
            urlDiv.appendChild(this.urlInput);

            this.typeServiceLabel = document.createElement("div");
            $(this.typeServiceLabel).addClassName("label");
            this.typeServiceLabel.addClassName("no_display");
            this.typeServiceLabel.appendChild(document.createTextNode(_("Type:")));
            this.serviceDialog.appendChild(this.typeServiceLabel);

            this.typeServiceSelect = new StyledElements.StyledSelect();
            this.typeServiceSelect.addEventListener("change" , this._updateServiceSelect.bind(this));
            this.typeServiceSelect.addClassName("type");
            this.typeServiceSelect.addClassName("no_display");
            this.typeServiceSelect.insertInto(this.serviceDialog);

            var cancelDialogButton = conwet.ui.UIUtils.createButton({
                "classNames": ["button"],
                "title"     : _("Cancel"),
                "value"     : _("Cancel"),
                "onClick"   : this._hideAddServiceDialog.bind(this)
            });
            this.serviceDialog.appendChild(cancelDialogButton);

            var addDialogButton = conwet.ui.UIUtils.createButton({
                "classNames": ["button"],
                "title"     : _("Add service"),
                "value"     : _("Add service"),
                "onClick"   : function(e) {
                    var type = null;
                    for (var i=0; i<this.catalogue.length; i++) {
                        if ((this.typeSelect.getValue() == this.catalogue[i].type) && ("service_types" in this.catalogue[i])) {
                            type = this.typeServiceSelect.getValue();
                        }
                    }
                    this.addService(this.nameInput.value, this.urlInput.value, type);
                }.bind(this)
            });
            this.serviceDialog.appendChild(addDialogButton);

        },

        addService: function(name, url, type, isWSMC) {
            for (var i=0; i< this.catalogue.length; i++) {
                if (this.catalogue[i].type == this.typeSelect.getValue()) {
                    var service = {"name": name, "url": url}
                    if (type) {
                        service.type = type;
                    }
                    if (isWSMC){
                        service.isWSMC = true;
                    }

                    this.catalogue[i].services.push(service);

                    this._addRemovableOption(this.serviceSelect, name, url, true);
                    this._hideAddServiceDialog();
                    this._save();
                    return;
                }
            }
        },

        removeService: function(name, url) {
            for (var i=0; i< this.catalogue.length; i++) {
                if (this.catalogue[i].type == this.typeSelect.getValue()) {
                    for (var j=0; j< this.catalogue[i].services.length; j++) {
                        var service = this.catalogue[i].services[j];
                        if ((service.name == name) && (service.url == url)) {
                            this.catalogue[i].services.splice(j,1);
                            this._save();
                            return;
                        }
                    }
                }
            }
        },

        _addRemovableOption: function(select, name, value) {
            select.addEntries([{label: name, value: value}]);
        },

        _showAddServiceDialog: function() {
            this.serviceDialog.removeClassName("no_display");
            this.backgroundDialog.removeClassName("no_display");

            this.typeServiceSelect.clear();

            for (var i=0; i<this.catalogue.length; i++) {
                if (this.typeSelect.getValue() == this.catalogue[i].type) {
                    if ("service_types" in this.catalogue[i]) {
                        for (var j=0; j<this.catalogue[i].service_types.length; j++) {
                            this.typeServiceSelect.addEntries([{label: this.catalogue[i].service_types[j], value: this.catalogue[i].service_types[j]}]);
                        }
                        this.typeServiceLabel.removeClassName("no_display");
                        this.typeServiceSelect.removeClassName("no_display");
                        this.serviceDialog.addClassName("big");
                        break;
                    }
                }
            }
        },

        _hideAddServiceDialog: function() {
            this.nameInput.value = "";
            this.urlInput.value  = "";
            this.serviceDialog.addClassName("no_display");
            this.backgroundDialog.addClassName("no_display");
            this.typeServiceLabel.addClassName("no_display");
            this.typeServiceSelect.addClassName("no_display");
            this.serviceDialog.removeClassName("big");
        },

        _sendService: function() {
            var url = this.serviceSelect.getValue();

            if (url == "") {
                return this.showError(_("Select a service"));
            }

            var name = this.serviceSelect.getLabel();
            var url  = this.serviceSelect.getValue();

            var type = null;
            for (var i=0; i<this.catalogue.length; i++) {
                if ((this.typeSelect.getValue() == this.catalogue[i].type) && ("service_types" in this.catalogue[i])) {
                    for (var j=0; j<this.catalogue[i].services.length; j++) {
                        var service = this.catalogue[i].services[j];
                        if ((service.name == name) && (service.url == url)) {
                            type = service.type;
                        }
                    }
                }
            }

            var service = {
                "type": this.typeSelect.getValue(),
                "name": name,
                "url" : url
            };

            if (type) {
                service.service_type = type;
            }

            MashupPlatform.wiring.pushEvent("service_info_event", JSON.stringify(service));
        },

        _updateServiceSelect: function() {
            if (!this.serviceSelect)
                return;

            this.serviceSelect.clear();
            this.serviceSelect.addEntries([{label:_("Select a service"), value: ""}]);

            for (var i=0; i< this.catalogue.length; i++) {
                if (this.catalogue[i].type == this.typeSelect.getValue()) {
                    for (var j=0; j< this.catalogue[i].services.length; j++) {
                        var service = this.catalogue[i].services[j];
                        this._addRemovableOption(this.serviceSelect, service.name, service.url);
                    }
                    return;
                }
            }
        },

        _save: function() {
            this.servicesPreference.set(Object.toJSON(this.catalogue));
        },

        showMessage: function(message, permanent) {
            this.messageManager.showMessage(message, conwet.ui.MessageManager.INFO, permanent);
        },

        hideMessage: function() {
            this.messageManager.hideMessage();
        },

        showError: function(message, permanent) {
            this.messageManager.showMessage(message, conwet.ui.MessageManager.ERROR, permanent);
        }

    });

})();
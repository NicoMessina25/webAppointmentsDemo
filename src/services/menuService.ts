import axios from "axios";

export function buildMenu(){
    return axios.get(process.env.REACT_APP_MEDERE_ADDRESS+'/validatemedereuser')    
}

export function simulateBuildMenu(){
    return {
    "userId": 1,
    "firstName": "admin",
    "lastName": "admin",
    "siteId": 1,
    "languageId": 1,
    "entityId": 44443,
    "regionalSettings": {
        "decimalSeparator": ",",
        "groupingSeparator": ".",
        "currencySymbolString": "$",
        "shortDateFormatString": "dd/MM/yyyy",
        "dateTimeFormatString": "dd/MM/yyyy HH:mm",
        "timeFormatString": "HH:mm"
    },
    "menuBuilder": {
        "items": [
            {
                "menuItem": {
                    "menuItem": 1,
                    "name": "Home",
                    "_order": 0,
                    "menuItemI18n": [
                        {
                            "language": {
                                "language": 1,
                                "name": "Español",
                                "code": "es"
                            },
                            "description": "Inicio",
                            "menuItemI18n": 1
                        }
                    ],
                    "menuItemActions": [],
                    "showsInMenu": true,
                    "iconName": "HOME_O",
                    "viewPath": "",
                    "viewName": "homeView",
                    "stateful": true,
                    "hibernateLazyInitializer": {}
                },
                "childs": []
            },
            {
                "menuItem": {
                    "menuItem": 300,
                    "name": "Turnos",
                    "_order": 1,
                    "menuItemI18n": [
                        {
                            "language": {
                                "language": 1,
                                "name": "Español",
                                "code": "es"
                            },
                            "description": "Turnos",
                            "menuItemI18n": 300
                        }
                    ],
                    "menuItemActions": [],
                    "showsInMenu": true,
                    "iconName": null
                },
                "childs": [
                    {
                        "menuItem": {
                            "menuItem": 301,
                            "name": "Horarios Profesionales",
                            "_order": 10,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Horarios Profesionales",
                                    "menuItemI18n": 301
                                }
                            ],
                            "menuItemActions": [
                                {
                                    "menuItemAction": 17,
                                    "actionName": "Agregar exclusiones por especialidad",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Agregar exclusiones por especialidad",
                                            "menuItemActionI18n": 36
                                        },
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "Add exclusiones by speciality",
                                            "menuItemActionI18n": 37
                                        }
                                    ]
                                },
                                {
                                    "menuItemAction": 18,
                                    "actionName": "Agregar exclusiones por locación",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Agregar exclusiones por locación",
                                            "menuItemActionI18n": 38
                                        },
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "Add exclusions by location",
                                            "menuItemActionI18n": 39
                                        }
                                    ]
                                },
                                {
                                    "menuItemAction": 19,
                                    "actionName": "Ver todas las agendas",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Ver todas las agendas",
                                            "menuItemActionI18n": 40
                                        },
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "View all agendas",
                                            "menuItemActionI18n": 41
                                        }
                                    ]
                                },
                                {
                                    "menuItemAction": 20,
                                    "actionName": "Ver todos los profesionales en exclusiones",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Ver todos los profesionales en exclusiones",
                                            "menuItemActionI18n": 42
                                        },
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "View all professionals in exclusiones",
                                            "menuItemActionI18n": 43
                                        }
                                    ]
                                }
                            ],
                            "showsInMenu": true,
                            "iconName": "CALENDAR_USER",
                            "viewPath": "CRUDMedicalTemplateProfessionalsView",
                            "viewName": "CRUDMedicalTemplateProfessionalsView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 302,
                            "name": "Horarios Servicios",
                            "_order": 20,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Horarios Servicios",
                                    "menuItemI18n": 302
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "CALENDAR_CLOCK",
                            "viewPath": "CRUDScheduleTemplateSpecialitiesView",
                            "viewName": "CRUDScheduleTemplateSpecialitiesView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 304,
                            "name": "Turnos Profesionales",
                            "_order": 30,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Agenda de Profesionales",
                                    "menuItemI18n": 304
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "USER_CLOCK",
                            "viewPath": "appointmentsprofessionalsview",
                            "viewName": "appointmentsProfessionalsView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 308,
                            "name": "Turnos excluídos",
                            "_order": 40,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Turnos excluídos",
                                    "menuItemI18n": 308
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "EXIT",
                            "viewPath": "pendingunavailableview",
                            "viewName": "pendingUnavailableView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 307,
                            "name": "Agenda de Servicios",
                            "_order": 40,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Agenda de Servicios",
                                    "menuItemI18n": 307
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "CALENDAR",
                            "viewPath": "appointmentsspecialitiesview",
                            "viewName": "appointmentsSpecialitiesView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 305,
                            "name": "AppointmentQueue",
                            "_order": 305,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Turnos del día",
                                    "menuItemI18n": 305
                                }
                            ],
                            "menuItemActions": [
                                {
                                    "menuItemAction": 22,
                                    "actionName": "Ver historia clínica",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Ver historia clínica",
                                            "menuItemActionI18n": 46
                                        },
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "View medical records",
                                            "menuItemActionI18n": 48
                                        }
                                    ]
                                }
                            ],
                            "showsInMenu": true,
                            "iconName": "BULLETS",
                            "viewPath": "CRUDAppointmentsQueueView",
                            "viewName": "CRUDAppointmentsQueueView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 309,
                            "name": "Turnos multisesión",
                            "_order": 309,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Turnos multisesión",
                                    "menuItemI18n": 309
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "SUN_O",
                            "viewPath": "multisessionappointmentsview",
                            "viewName": "multisessionAppointmentsView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 28,
                            "name": "Resumen Pacientes Atendidos",
                            "_order": 900,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Resumen Pacientes Atendidos",
                                    "menuItemI18n": 28
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "CHART",
                            "viewPath": "summaryattentionsview",
                            "viewName": "summaryAttentionsView",
                            "stateful": true
                        },
                        "childs": []
                    }
                ]
            },
            {
                "menuItem": {
                    "menuItem": 1000,
                    "name": "Facturación",
                    "_order": 1,
                    "menuItemI18n": [
                        {
                            "language": {
                                "language": 1,
                                "name": "Español",
                                "code": "es"
                            },
                            "description": "Facturación",
                            "menuItemI18n": 1000
                        }
                    ],
                    "menuItemActions": [],
                    "showsInMenu": true,
                    "iconName": null
                },
                "childs": [
                    {
                        "menuItem": {
                            "menuItem": 1005,
                            "name": "Movimientos",
                            "_order": 2,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Movimientos",
                                    "menuItemI18n": 1005
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "USER_CARD",
                            "viewPath": "adminformsview",
                            "viewName": "adminFormsView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 1002,
                            "name": "Contratos",
                            "_order": 5,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Contratos",
                                    "menuItemI18n": 1002
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "CLIPBOARD_USER",
                            "viewPath": "contractsview",
                            "viewName": "contractsView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 1001,
                            "name": "Nomenclador",
                            "_order": 10,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Nomenclador",
                                    "menuItemI18n": 1001
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "CLIPBOARD_CROSS",
                            "viewPath": "crudnomenclatorview",
                            "viewName": "CRUDNomenclatorView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 1033,
                            "name": "Consulta ordenes de prestación",
                            "_order": 11,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Consulta ordenes de prestación",
                                    "menuItemI18n": 1033
                                }
                            ],
                            "menuItemActions": [
                                {
                                    "menuItemAction": 15,
                                    "actionName": "Restringir ordenes a profesional",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "Restrict benefit orders to professional",
                                            "menuItemActionI18n": 33
                                        },
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Restringir ordenes a profesional",
                                            "menuItemActionI18n": 32
                                        }
                                    ]
                                }
                            ],
                            "showsInMenu": true,
                            "iconName": "CLIPBOARD_TEXT",
                            "viewPath": "CRUDBenefitOrderView",
                            "viewName": "CRUDBenefitOrderView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 1041,
                            "name": "Fact. OOSS",
                            "_order": 15,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Fact. Obras Sociales",
                                    "menuItemI18n": 1041
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "BOOK_DOLLAR",
                            "viewPath": "itempreloadinvoiceview",
                            "viewName": "itemPreLoadInvoiceView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 1003,
                            "name": "Grupos de Prestaciones",
                            "_order": 20,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Grupos de Prestaciones",
                                    "menuItemI18n": 1003
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "CLIPBOARD_TEXT",
                            "viewPath": "crudnomenclatorgroupview",
                            "viewName": "CRUDNomenclatorGroupView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 1032,
                            "name": "Conceptos facturables",
                            "_order": 25,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Conceptos facturables",
                                    "menuItemI18n": 1032
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "CLIPBOARD_TEXT",
                            "viewPath": "CRUDBillingConceptView",
                            "viewName": "CRUDBillingConceptView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 1004,
                            "name": "Puntos de venta",
                            "_order": 40,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Puntos de venta",
                                    "menuItemI18n": 1004
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "SHOP",
                            "viewPath": "posview",
                            "viewName": "POSView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 1034,
                            "name": "Resumen de caja",
                            "_order": 401,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Resumen de caja",
                                    "menuItemI18n": 1034
                                }
                            ],
                            "menuItemActions": [
                                {
                                    "menuItemAction": 13,
                                    "actionName": "Ver resumen de otros usuarios",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Ver resumen de otros usuarios",
                                            "menuItemActionI18n": 28
                                        },
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "View other users",
                                            "menuItemActionI18n": 29
                                        }
                                    ]
                                }
                            ],
                            "showsInMenu": true,
                            "iconName": "CLIPBOARD_TEXT",
                            "viewPath": "CashReceiptView",
                            "viewName": "cashReceiptView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 1040,
                            "name": "Cuentas",
                            "_order": 401,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Cuentas",
                                    "menuItemI18n": 1040
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "CLIPBOARD_TEXT",
                            "viewPath": "accountview",
                            "viewName": "accountView",
                            "stateful": true
                        },
                        "childs": []
                    }
                ]
            },
            {
                "menuItem": {
                    "menuItem": 13,
                    "name": "Stock",
                    "_order": 8,
                    "menuItemI18n": [
                        {
                            "language": {
                                "language": 1,
                                "name": "Español",
                                "code": "es"
                            },
                            "description": "Stock",
                            "menuItemI18n": 13
                        }
                    ],
                    "menuItemActions": [],
                    "showsInMenu": true,
                    "iconName": null
                },
                "childs": [
                    {
                        "menuItem": {
                            "menuItem": 204,
                            "name": "Pedidos de Materiales",
                            "_order": 16,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Pedidos de Materiales",
                                    "menuItemI18n": 204
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "PACKAGE",
                            "viewPath": "stockmaterialsrequestview",
                            "viewName": "stockMaterialsRequestView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 205,
                            "name": "Pedidos Recibidos",
                            "_order": 17,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Pedidos Recibidos",
                                    "menuItemI18n": 205
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "STOCK",
                            "viewPath": "stockreceivedrequestsview",
                            "viewName": "stockReceivedRequestsView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 2043,
                            "name": "Movimientos de stock",
                            "_order": 203,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Movimientos de stock",
                                    "menuItemI18n": 2065
                                },
                                {
                                    "language": {
                                        "language": 2,
                                        "name": "English",
                                        "code": "en"
                                    },
                                    "description": "Stock movements",
                                    "menuItemI18n": 2064
                                }
                            ],
                            "menuItemActions": [
                                {
                                    "menuItemAction": 48,
                                    "actionName": "Movimientos de stock",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "Stock movements",
                                            "menuItemActionI18n": 99
                                        },
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Movimientos de stock",
                                            "menuItemActionI18n": 100
                                        }
                                    ]
                                }
                            ],
                            "showsInMenu": true,
                            "iconName": "GROUP",
                            "viewPath": "allstockmovementsview",
                            "viewName": "allStockMovementsView",
                            "stateful": true
                        },
                        "childs": []
                    }
                ]
            },
            {
                "menuItem": {
                    "menuItem": 2030,
                    "name": "Quirófano",
                    "_order": 10,
                    "menuItemI18n": [
                        {
                            "language": {
                                "language": 1,
                                "name": "Español",
                                "code": "es"
                            },
                            "description": "Quirófano",
                            "menuItemI18n": 2030
                        }
                    ],
                    "menuItemActions": [],
                    "showsInMenu": true,
                    "iconName": null
                },
                "childs": [
                    {
                        "menuItem": {
                            "menuItem": 2032,
                            "name": "Reserva de Quirófanos",
                            "_order": 1,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Reserva de Quirófanos",
                                    "menuItemI18n": 2032
                                }
                            ],
                            "menuItemActions": [
                                {
                                    "menuItemAction": 3,
                                    "actionName": "Quirófanos fuera de equipo",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Quirófano fuera de equipo",
                                            "menuItemActionI18n": 5
                                        },
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "Surgery room out of team",
                                            "menuItemActionI18n": 6
                                        }
                                    ]
                                },
                                {
                                    "menuItemAction": 4,
                                    "actionName": "Agendar Operación no programada",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Agendar Operación no programada",
                                            "menuItemActionI18n": 7
                                        },
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "Schedule Unscheduled Operation",
                                            "menuItemActionI18n": 8
                                        }
                                    ]
                                },
                                {
                                    "menuItemAction": 6,
                                    "actionName": "Editar turnos ajenos",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Editar turnos ajenos",
                                            "menuItemActionI18n": 12
                                        },
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "Modify others appointments",
                                            "menuItemActionI18n": 13
                                        }
                                    ]
                                },
                                {
                                    "menuItemAction": 8,
                                    "actionName": "Confirmar cirugía",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Confirmar cirugía",
                                            "menuItemActionI18n": 18
                                        },
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "Confirm surgery",
                                            "menuItemActionI18n": 19
                                        }
                                    ]
                                },
                                {
                                    "menuItemAction": 10,
                                    "actionName": "Anular cirugía",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Anular cirugía",
                                            "menuItemActionI18n": 22
                                        },
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "Null surgery",
                                            "menuItemActionI18n": 23
                                        }
                                    ]
                                }
                            ],
                            "showsInMenu": true,
                            "iconName": "HOSPITAL",
                            "viewPath": "crudoperationroomappointmentsview",
                            "viewName": "CRUDOperationRoomAppointmentsView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 2033,
                            "name": "Equipos de Profesionales",
                            "_order": 2,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Equipos de Profesionales",
                                    "menuItemI18n": 2033
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "GROUP",
                            "viewPath": "crudsurgeryteamview",
                            "viewName": "CRUDSurgeryTeamView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 2034,
                            "name": "Horarios Quirófano",
                            "_order": 3,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Horarios Quirófano",
                                    "menuItemI18n": 2034
                                }
                            ],
                            "menuItemActions": [],
                            "showsInMenu": true,
                            "iconName": "CALENDAR_USER",
                            "viewPath": "crudmedicaltemplatesurgeryteamview",
                            "viewName": "CRUDMedicalTemplateSurgeryTeamView",
                            "stateful": true
                        },
                        "childs": []
                    },
                    {
                        "menuItem": {
                            "menuItem": 2035,
                            "name": "Agenda de Quirófano",
                            "_order": 3,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Agenda de Quirófano",
                                    "menuItemI18n": 2035
                                }
                            ],
                            "menuItemActions": [
                                {
                                    "menuItemAction": 1,
                                    "actionName": "Agendar Operación no programada",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Agendar Operación no programada",
                                            "menuItemActionI18n": 1
                                        },
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "Schedule Unscheduled Operation",
                                            "menuItemActionI18n": 2
                                        }
                                    ]
                                },
                                {
                                    "menuItemAction": 5,
                                    "actionName": "Quirófanos fuera de equipo",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Quirófano fuera de equipo",
                                            "menuItemActionI18n": 9
                                        },
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "Surgery room out of team",
                                            "menuItemActionI18n": 10
                                        }
                                    ]
                                },
                                {
                                    "menuItemAction": 7,
                                    "actionName": "Editar turnos ajenos",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "Modify others appointments",
                                            "menuItemActionI18n": 17
                                        },
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Editar turnos ajenos",
                                            "menuItemActionI18n": 16
                                        }
                                    ]
                                },
                                {
                                    "menuItemAction": 9,
                                    "actionName": "Confirmar cirugía",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Confirmar cirugía",
                                            "menuItemActionI18n": 20
                                        },
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "Confirm surgery",
                                            "menuItemActionI18n": 21
                                        }
                                    ]
                                },
                                {
                                    "menuItemAction": 11,
                                    "actionName": "Anular cirugía",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Anular cirugía",
                                            "menuItemActionI18n": 24
                                        },
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Null surgery",
                                            "menuItemActionI18n": 25
                                        }
                                    ]
                                }
                            ],
                            "showsInMenu": true,
                            "iconName": "CALENDAR_CLOCK",
                            "viewPath": "surgeryscheduledappointmentsview",
                            "viewName": "surgeryScheduledAppointmentsView",
                            "stateful": true
                        },
                        "childs": []
                    }
                ]
            },
            {
                "menuItem": {
                    "menuItem": 20,
                    "name": "Pacientes",
                    "_order": 20,
                    "menuItemI18n": [
                        {
                            "language": {
                                "language": 1,
                                "name": "Español",
                                "code": "es"
                            },
                            "description": "Pacientes",
                            "menuItemI18n": 20
                        }
                    ],
                    "menuItemActions": [],
                    "showsInMenu": true,
                    "iconName": null
                },
                "childs": [
                    {
                        "menuItem": {
                            "menuItem": 23,
                            "name": "Pacientes",
                            "_order": 23,
                            "menuItemI18n": [
                                {
                                    "language": {
                                        "language": 1,
                                        "name": "Español",
                                        "code": "es"
                                    },
                                    "description": "Pacientes",
                                    "menuItemI18n": 23
                                }
                            ],
                            "menuItemActions": [
                                {
                                    "menuItemAction": 2,
                                    "actionName": "Acceso a historia clínica",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Acceso a historia clínica",
                                            "menuItemActionI18n": 3
                                        },
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "Medical record access",
                                            "menuItemActionI18n": 4
                                        }
                                    ]
                                },
                                {
                                    "menuItemAction": 27,
                                    "actionName": "Unificar registros médicos",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Unificar registros médicos",
                                            "menuItemActionI18n": 57
                                        },
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "Merge medical records",
                                            "menuItemActionI18n": 58
                                        }
                                    ]
                                },
                                {
                                    "menuItemAction": 28,
                                    "actionName": "Ordenes de prestación",
                                    "menuItemActionI18n": [
                                        {
                                            "language": {
                                                "language": 1,
                                                "name": "Español",
                                                "code": "es"
                                            },
                                            "description": "Ordenes de prestación",
                                            "menuItemActionI18n": 59
                                        },
                                        {
                                            "language": {
                                                "language": 2,
                                                "name": "English",
                                                "code": "en"
                                            },
                                            "description": "Benefit orders",
                                            "menuItemActionI18n": 62
                                        }
                                    ]
                                },
                                {
                                    "menuItemAction": 29,
                                    "actionName": "Agregar Pacientes",
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    }
    }
}

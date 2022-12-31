// import AnalyticsTwoToneIcon from "@mui/icons-material/AnalyticsTwoTone";
// import HealthAndSafetyTwoToneIcon from "@mui/icons-material/HealthAndSafetyTwoTone";
// import AssignmentIndTwoToneIcon from "@mui/icons-material/AssignmentIndTwoTone";
// import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
// import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
// import VpnKeyTwoToneIcon from "@mui/icons-material/VpnKeyTwoTone";
// import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
// import ReceiptTwoToneIcon from "@mui/icons-material/ReceiptTwoTone";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
// import SmartToyTwoToneIcon from "@mui/icons-material/SmartToyTwoTone";
import InventoryIcon from "@mui/icons-material/Inventory";

const menuItems = [
  {
    heading: "Gestão de Clientes",
    module: "MOD_CRM",
    items: [
      {
        name: "CRM",
        icon: FilterAltIcon,
        link: "/app/crm",
        // badge: "1",
        items: [
          {
            name: "Dashboard",
            link: "crm/dashboard",
            // badge: "1",
            badgeTooltip: "dashboard CRM",
          },
          {
            name: "Indicação",
            link: "crm/indicate",
            // badge: "1",
            badgeTooltip: "Indicação de Clientes",
          },
          {
            name: "Minhas Indicações",
            link: "crm/myLeads",
            // badge: "1",
            badgeTooltip: "Minhas Indicações",
          },
          {
            name: "Gestão de Indicação",
            link: "crm/managerLeads",
            // badge: "1",
            badgeTooltip: "Gestão de Indicação",
          },
          {
            name: "Captação e Reativação",
            link: "crm/captureReactivation",
            // badge: "1",
            badgeTooltip: "Captação e Reativação",
          },
        ],
      },
      // {
      //   name: "Price",
      //   icon: PriceCheckIcon,
      //   link: "/extended-sidebar/applications",
      //   items: [],
      // },
    ],
  },
  {
    heading: "Gestão de Crédito",
    module: "MOD_CADASTRO",
    items: [
      {
        name: "Crédito",
        icon: MonetizationOnIcon,
        // badge: "",
        badgeTooltip: "Analise de crédito",
        link: "/app/credit",
        items: [
          {
            name: "Clientes Novos",
            link: "credit/indicate",
            // badge: "1",
            badgeTooltip: "Clientes Novos",
          },
        ],
      },
    ],
  },
  // {
  //   heading: "Operação - Em breve",
  //   module: "MOD:",
  //   items: [],
  // },
  {
    heading: "Gestão de tarefas",
    module: "MOD_ACTIVITIES",
    items: [
      {
        name: "Tarefas",
        icon: AssignmentIcon,
        link: "/app/tarefas",
        // badge: "1",
        items: [
          {
            name: "Minhas tarefas",
            link: "tarefas/myTasks",
            // badge: "1",
          },
          {
            name: "Dashboard",
            link: "tarefas/dashboard",
          },
        ],
      },
    ],
  },
  {
    heading: "Painel administrativo",
    module: "ADMINISTRADORES",
    items: [
      {
        name: "Usuários",
        icon: PeopleRoundedIcon,
        link: "app/usuarios",
        items: [
          { name: "Cadastro de usuário", link: "usuarios/userRegistration" },
        ],
      },
    ],
  },
  {
    heading: "Análise - em breve",
    module: "ANALISE",
    items: [
      {
        name: "Relatórios",
        icon: PeopleRoundedIcon,
        link: "app/reports",
        items: [
          { name: "Contas a Receber", link: "reports/accountReceivable" },
          { name: "Histórico de Vendas", link: "usuarios/userRegistration" },
          {
            name: "Abastecimentos Cliente",
            link: "usuarios/userRegistration",
          },
          { name: "Vendas Operador", link: "usuarios/userRegistration" },
        ],
      },
    ],
  },
];

export default menuItems;

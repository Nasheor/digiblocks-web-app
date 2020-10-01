export default {
name: 'DashboardCoreFooter',

data: () => ({
    links: [
    {
        href: '/dashboard',
        text: localStorage.getItem("title"),
    },
    {
        href: '/dashboard',
        text: localStorage.getItem("country"),
    },
    {
        href: '/dashboard',
        text: localStorage.getItem("address"),
    },
    ],
}),
}

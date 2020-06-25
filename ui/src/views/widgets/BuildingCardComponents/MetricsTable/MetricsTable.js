export default {
    name: "TheProductAvailibility",
    data: () => ({
      select: { state: "Electronics", abbr: "FL" },
      items: [
        { state: "Labs", abbr: "FL" },
        { state: "Appliances", abbr: "GA" },
        { state: "Printers", abbr: "NE" },
        { state: "Other", abbr: "CA" }
      ],
      monthtable: [
        {
          btnbg: "info",
          title: "Apple iPhone 6 Space Grey, 16 GB",
          subtext: "Product id : MI5457",
          quantity: "357",
          price: "$435"
        },
        {
          btnbg: "success",
          title: "Printer",
          subtext: "Product id : MI5457",
          quantity: "400",
          price: "$198"
        },
        {
          btnbg: "error",
          title: "Sony Bravia TV",
          subtext: "Product id : MI5457",
          quantity: "485",
          price: "$450"
        },
        {
          btnbg: "deep-purple accent-2",
          title: "Panasonic P75",
          subtext: "Product id : MI5457",
          quantity: "5100",
          price: "$145"
        }
      ]
    })
  };
export default {
    props: [
      "building_data",
    ],
    data: () => ({
      reverse: false,
      tab: null,
      activity: null,
      profile: null,
      settings: null,
      valueDeterminate: 80,
      valueDeterminate2: 90,
      valueDeterminate3: 50,
      valueDeterminate4: 70,
      rules: [
        value => !!value || "Required.",
        value => (value && value.length >= 3) || "Min 3 characters"
      ],
      select: null,
      icon_one: "mdi-star",
      icon_two: "mdi-book-variant",
      icon_three: "mdi-airballoon",
      icon_four: "mdi-buffer",
      items: [
        {
          color: 'error lighten-2',
          icon: 'mdi-star',
        },
        {
          color: 'info darken-1',
          icon: 'mdi-book-variant',
        },
        {
          color: 'success lighten-1',
          icon: 'mdi-airballoon',
        },
        {
          color: 'indigo',
          icon: 'mdi-buffer',
        },
      ],
    }),
    components: {}
  };
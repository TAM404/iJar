<template>
  <div class="min-h-screen  bg-white">
    <!-- Hero Section -->
    <HeaderSection :agency="agency" @update:agency="updateAgency" />
    <!-- Stats Bar -->
    <StatsBar :agency="agency" @update:agency="updateAgency" />


<div class="flex flex-col">
    <!-- Main Content with Cards -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style="font-family: Poppins,serif ;max-width: 100rem;
">


      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">


        <!-- Contact Form -->
        <ContactForm :agencyName="agency.name" />


        <!-- About Card -->
        <AboutSection :agency="agency" @update:agency="updateAgency" />


        <!-- empty -->
        <div class="space-y-8">
          <!-- empty for grid -->
        </div>

        <!-- Contact Card -->
        <ContactCard :agency="agency" />

        <!-- Location Card -->
        <LocationCard :agency="agency" />


      </div>
      <!-- Team Members -->
      <TeamMembers :agents="agency.topAgents"  />

      <!-- Featured Listings Section -->
      <FeaturedListings :listings="agency.featuredListings" />

      <!-- Testimonials Section -->
      <IntegratedTestimonials/>
    </div>

    </div>

    <!-- CTA Section -->
    <CTASection />

    <!-- Footer -->
    <FooterSection :agency="agency" />

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import StarRating from '/src/components/RealEstate/StarRating.vue'
import AgencyMap from '/src/components/RealEstate/AgencyMap.vue'
import HeaderSection from "@/components/RealEstate/HeaderSection.vue";
import StatsBar from "@/components/RealEstate/StatsBar.vue";
import AboutSection from "@/components/RealEstate/AboutSection.vue";
import LocationCard from "@/components/RealEstate/LocationCard.vue";
import ContactCard from "@/components/RealEstate/ContactCard.vue";
import TestimonialsSection from "@/components/RealEstate/TestimonialsSection.vue";
import CTASection from "@/components/RealEstate/CTASection.vue";
import FooterSection from "@/components/RealEstate/FooterSection.vue";
import IntegratedTestimonials from "@/components/RealEstate/IntegratedTestimonials.vue";
import ContactForm from "@/components/RealEstate/ContactForm.vue";
import TeamMembers from "@/components/RealEstate/TeamMembers.vue";
import FeaturedListings from "@/components/RealEstate/FeaturedListings.vue";

export default defineComponent({
  name: 'AgencyProfile',
  components: {
    FeaturedListings,
    TeamMembers,
    ContactForm,
    IntegratedTestimonials,
    FooterSection,
    CTASection,
    TestimonialsSection,
    ContactCard,
    LocationCard,
    AboutSection,
    StatsBar,
    HeaderSection,
    StarRating,
    AgencyMap
  },
  data() {
    return {
      agency: {
        name: 'Premium Real Estate Agency',
        logoUrl: 'https://media.licdn.com/dms/image/v2/D560BAQEzr8qXBdRLgA/company-logo_200_200/company-logo_200_200/0/1715902987353/sothebysrealty_logo?e=2147483647&v=beta&t=VgNn94g57aU-m5oilNRaAtW312BNKXRgAAqUb1QcsjM',
        rating: 4.8,
        reviewCount: 127,
        yearFounded: 2010,
        propertiesSold: 1200,
        agentsCount: 24,
        clientSatisfaction: 98,
        description: 'Premium Real Estate Agency has been a leader in luxury real estate services since 2010. We specialize in high-end properties and provide exceptional service to both buyers and renters. Our team of expert agents combines in-depth local knowledge with global connections to deliver unparalleled real estate experiences. Whether you re looking to buy, sell, or rent, our personalized approach ensures that your real estate journey is smooth and successful.',
        services: [
          'Luxury Residential Sales',
          'Premium Rental Properties',
          'Commercial Real Estate',
          'Property Management',
          'Virtual 3D Tours',
          'Legal Consultation',
          'Market Analysis Reports',
          'Investment Advisory'
        ],
        address: '123 Business District, New York, NY 10001',
        hours: 'Mon-Fri: 9am-6pm, Sat: 10am-4pm',
        phone: '+1 (212) 555-1234',
        email: 'contact@premiumrealestate.com',
        website: 'www.premiumrealestate.com',
        location: {
          lat: 40.7128,
          lng: -74.0060
        },
        awards: [
          { title: 'Best Luxury Agency', year: '2023' },
          { title: 'Customer Excellence Award', year: '2022' },
          { title: 'Top Producer in Manhattan', year: '2021' }
        ],
        socialMedia: [
          { platform: 'facebook', url: '#' },
          { platform: 'instagram', url: '#' },
          { platform: 'twitter', url: '#' },
          { platform: 'linkedin', url: '#' }
        ],
        testimonials: [
          {
            name: 'Sarah Johnson',
            location: 'Manhattan, NY',
            text: 'The team at Premium Real Estate helped us find our dream home in just two weeks. Their knowledge of the market is exceptional!',
            rating: 5,
            date: 'March 2023',
            avatarUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMoAAACUCAMAAADlP0YdAAABWVBMVEX////24NUfHj6VG4D/nHz///3239djXWz/7OB/dX8ACDcSFDn8///04dT64NSVG4KZGX/15d3/nnrDZWMbGz0AADT//Pf48u768On/m4HggnIAACgAADEAACz26uP+9/H/poT/pn6MAHgAABsAACEcIDwhHEIAADkAEjvFZV35loGMAH9/AGyRAHPl1+DMmce7caXUxcWqnKQ7PE4wKkIsKDqmmZlXUWMQDDYeGEPjzcvCr7VKRVrl1MlrZW3AsauLho0WFDAAAACekqHDhHjmk3qYY11KLkM+LUTCfmuHVlqocGttSlQzI0FcQ02zfHE7JjV4UE0oHyvsoY2XZWpUPVLVi3zBinKpbF6AXF+eWVwFJDNdOFHPiGt4FmGdI3rCVn72jop7QGM4Fk5OGVdrIGnXcYDie32mMnW3S4eqbpgjAD7hu8WmRpPHj653W3qqXJ7kxeLNp8cQPVWUAAAN1klEQVR4nM2d+1vaShrHSSAjEhJIGgh4gUgbpCJalapote1poVqpnm6rW8+u1bOtvZw9dtX//4d9JygQcpnJBfT7+LT2KUo+ea9zyRCJhCeOiyQjkSSXLRYkQUCIwRJF+MJibiRIhYLKcUl4KWf8zP0UF8nmAINBjJtEEUlSQc0CefJeonARDnPAlTI9EzigwEuwddTiPSPhsIBDxW7FIPhyNwrTMZqAv6Rckev8irumMAR+H+GAg3G3hYOwp92jkMmqYA/BDwi2jiBhmLsX3M1sTrpxGL8SpJyR/CJ3ZpuOl3dAggrDRAycO2LhODUUEAZbpnin8VKUAriVWZD5pOwdwUB1yyFfSctRQu5uYCBIUMgotyEzapIC9i1SMfQqkSmMnCW0cLdIUnGnObJclsz5K+2ULKPsYwootMxlC8ONyijZgiAGKe7ugmYUFUbTySTV0POWVVAvh24Y6OV9tsAehMcJw639xmg3hxjfTbAHGIFRueGmMfCuoWN0WBikDtPHcPc4fIt0hBDKDS8pd7xrRCiMIA4xXpLFEXnXjTosQ8HJoqHnrn4ZeSyZHArKyOKkKyRlw7cKBGBh1CA4JQ+h7nPZwmgD5RYm/Kafy42gMNpIRLlQO36oVarnGg9GFOMgKBAoLjFxUYQwFgTPE2aSGh6IgeJtpIUvX4hLS8vjYyv1+tOn9ZWx8dUlKR5nkA+WUBuYrMeQF+LxrdW19YeTCZ7ny41Gg+enMo8ya8sbgo8WLszQ53Le3httbY5NAYbCmqRUJqfXNre8oghCSC6GE0gWUY8a4XXixvLa5NQAxi3N1PSz5Q2v3Q9UynC6MS4rEZcZuhIZ8Kxp3pbDUHl98tnqhjcUCJeQGsuch3ZF2txmXUA6fsZvP2e8zJeLTCguBrdDokWBfPtiZarsToJh1usvtrzMdAhSGCiRiEr7nmJ8Y3t9XbGPkgEYZW1J9MKSC4MkS90Ox5+vrDcUKhRWSSibccFDCAbFwMFGW1JEafklIUpMavy2jBsAyl+OCgELJaCotDcOrSpeSMAwj5a9TEMFjHwuydEaBa2SMpeV5aUXlsAtcpbufQS07JkEWPRV3K7RvYUUrH3hKFsWUfBDwrJ8fRnRrmwETWJZuo44vvTUDwnLrtefC5R5TAhoFrqaIkp1fyQsW3m2QZuSg3WVXIGijRXF+FjGJwnLTm9Tl30IfP+hT7O2hZj48pRvEpZ9+Io6ixWDoFC9w5Jv98IqP1yiNYvvNVcwJ9koAiNsba8HIIGu/5lAl5BF30NjLlKkul2rOlXX5azJ5ThdQkaqT5RkJEdGEYSltUQwEqguSyINCmJyfvswiqZFYNCrdVuj6FDMqVnGqbIYYiS/wVKUKO7V0jNLpPDTlakMXa/fkbKyRJfF/JaWZI5izIpeTQ9eWKX+Wmu23rCV2QotDpiFAgT5bl6SFANhtFHn9YFbvLMry7Kmac3dtzuUtuFXNinMgnwPjLMCRTC+mjKHhF7W9zQ5ZkiWmx/rDSqY9RcSTeQjwV+wqBQ969YKPxDdfBsQYjeStd0yFQq/RlknVR/TSFykgMgozycHrkl5d9IFwZo5oErVyvoq3UJUzsfkHkdOxQISLH0k39Z6HHIsL2ttKpap8S0qlELSe2nhIkSTCGjr0aD78AeyySox+YTOLOwSDQmuLF6tkqRCWbX6l2YmARfbr1CZZZkmH4uC57V8jqNZ2Y6bW+KyXp490MwgkJd3JxuKrussniFTHKcuE9tbFCiCWPTqYIBC3gIibj0asEliX5MHrSLn936vzDYaeLLPJZspPI2HCaLnjhJQyA1YfNUc9HpipzkIgu2iHbXevz8+ftvecW7LdHZ6lQql4B2FYlYyPmZuv/h3ry0k2EhG7QfFTlqmimluEzJ0zUvBI4kxf0/+tfX+m6zw9T3NYhMzV2yvP7p0Ewu/skFmQcjz8IsGRVzq9xc+c7hryV4Wlvwe/MzNTylTCVNuy1DMvQCK161VNGvC8eVeOqpMtveaxn13R5Fjx7jMAE5l6h8fj9vrfTCTz4eG4t6rIiY+3jPKw9cE3+pK259MVCqZ2f29D/Cvozc9h8u8iNOMWryB0KFIY93LmG1acrCjYbTXb9sf9z5A1pZj8szJTveXJMaopkK9o3DESfaNZ7dXUWnP5GlR4PJBHXJIbTOtrmkVlqqj9IoSSWZJfiv0UDK71EYZjCZ5tzs8Ux5RZeOs58JCRGE2u7k4c0KPMkh2dNjtAR5SdZTeJ8GJKPHVHopNkadFaR52g+XRJo2DeUUhxwqKr3bLymyTPlTMIGCVncYtyvRynALFa49PUVfQi65nzELDkvdplU87t/McOmRjChSPJBiFGCsvurkncTxDKo5OJNrH7m8ZFgp5DwXqoSiZ2IzPaDk67KuR22QU5Hn6CBzS3SoIofG+izggtl8O+tTXxyXIKH4aFxgPu1rFjNJ4+sEXSv6kb7SsJ8aGhOLuYIjpRymvH/vKx823/XMYFCh4P5VH4Q0hhOf/+1EURd/zXiVlrWUa61OheB56gQhjexOKXi6/a3kNlxntuGyatbgrFJODwfhDYd83PZFou4e8YhrsU6EUvXJwxBRmQjFUeUfPIue1dmJwMZYGBXl+dMIPCjv92otRfrfMvgwLJckRejsrSmKPPlrko7ovFMEPSqQgui15iFaUSpu6fcnLe9Y5MRoUf2tFOcZ19caKovBH1GbR2tZtCzQoOV/bdAkpzIpSTrRoUbTdXm/vBUXws1QETia57jm1orDKO7qBSz4mt6wkFCii96jvyDMKm4A6SYaBAVdz/6V1Tp+EIoiinwIZIS1224Q9mGX2nzEKFLl5XNG9ozCC78XuouseBzsUlq83ZYrx5CeeLet+UDzX+hu5bzyyRWET7Tn3vhLP5B3Yb+Mlooh+97MT1iXsURT+uOk+5zrTbL20X9IjoSDG705QwnZpexS2/HL/tbGoYmcQ+ENrtgcf0aFGQX79K5J03c/qgALxstNq2gz1DT5NOzh0XDEmoYj+z6xx3WVsm8E6dmnwv7c0bdAueWMp732Zd1xaJcZKzu8DORzHFV0GxY4oOGAqO5+MqXqzWY7eGwt4TguSxLri27/wUWwF53TsgoJpMjtH+dhtzMAfMzP540zFGKM5iYQSbPu3y5ZDdxS49X88fjw3h90KrJOfm3j8uE3Yi0BACfggnnPgO8fKDcq7Px48ePB4YmKuOTcx8Ri+f2DTDNOjIJ/9fVecs1nIKMb1A87N3w/eBrEKEgM+XuCSj0koO2CLWwjQxMREi7Bxx93BAj/04byVioTyBhd98K2O5mLyXIuwc98dpRDs0Uj4acdncQgo/ButV+KNb/LBUNTgT3kWHI7EJFnl0DLFFwRFLHDBj3VxiBZiBju09C67/lEQ9CyBjeK4nZ3kYPuDa8EfmoQtoc4oAlIjoTwRbT9d4Y6iV45nzM2+nG8SaqQjio9NOg6y7/VdURSbrWF5+ZNTe0+yiv/uvl/4LFnbaHFGUfhEYv/Iul1Pa76vuFnSGSW8Y0OyNstG9tMUCl68Uvb3dpvWJQo80dLaqcwmWJ217fPtUSB/BqyOJtlFvq1V9H81/n3QbMZmnBa/mycH7fosr1snKZxRwjrQoSObmUoLiq7rfOPz/OnZnzNOMxWynM/HNHniP1/KipXGycFCPZXGrhXrQ1EwBtv4ej6fTqVSpdKPb3OdKt83+jJa/Tx+huL7WS2djp6ff2nouonHASVM98JSLRv0eyi6rpS/AEc0HcUCmmrt7NufgJM3Lv5GeXC6ue9nP0rVlPG69Pzn869lRdFdUXBJCVm5AZS+sMcc0XQq3SHBMNFUtVr6cfbt+3doJDuClvLb2c/TUvUGBLOkUtF5oNGdUQQRhX9qK1cYWMjHKDpr+FU0ncae1b1G4/tUFXiip6c/f56d/fz548dptFrtcNy8Lo3Z4Wv+KxhGsUfpnNkaMgw3mJHROJ46UQAk2jVHTzdc4GvwVa0af5v/q0/nX3QHq4hhB4qBgo9z6X+iGFAUvfy5e5MDKDX/BS97W1GEYZzWzHWmw00ovM5/trnH3pVOzX8FH7OieH+YgBaniHrnYuCw1yH5BgfBSqWAZRAlpJNobFGApbdOASjnNkHiU+noFwvKEJJXV0lO7T71KaDxr2HZxGD5XB5AGeYRmhE8mYRuV/XQ+HwqFZ5ZII9NmVCAZKifA4IPBO0M9RH6K0SbGPqvCUUd9knT3XgR/r4IGSV93kOBdmXoh2bjDyzAPiYIv8JIw/1KpTooAnQrUnEkH2TCZQuMKG5clsIlAZT/GSii6HvN0bOSyQJi/g6hyg+yXOCpUIFBASciqcXhXUk59KsUPkoNPyohSrmRHcgewZNj6q+w/Qval9rfuO0aWol30sJiNHSY1C9BGv0nZMD7XV3WwqyQ0Luk/soZ1WTkHyvBLSzO18Lo8W9Vm7/mbu/TqKUuXNZq4WDAuLN2uTDyMLkVByO8q9NwWNKli6u74ogYc7Cg64vqzSDdrzmiqWrp9PpefLjX9WW0lg6QAUqpy+s7/CCsnrBprp+c+q2YpVL08hrviPRxUkPoIIZfXP26iFbphy+GWwF8KX2xeKXeB4vcCl/KwvWTi1KV2jaAUqpePLleuBeuNaCkCjTgMDQ0qWqtlgYO9f58KmFPxhUBzdXiZanWZ510vwzXilZLtejl4tWCes8/yBPravFJuobnIzuTr6k+RbE1FodSQv4PtiG0V7mSGN8AAAAASUVORK5CYII='
          },
          {
            name: 'Michael Chen',
            location: 'Brooklyn, NY',
            text: 'As a first-time buyer, I appreciated their patience and guidance throughout the entire process.',
            rating: 4.5,
            date: 'January 2023',
            avatarUrl: 'https://cdn-icons-png.flaticon.com/512/147/147133.png'
          },
          {
            name: 'Emma Rodriguez',
            location: 'Queens, NY',
            text: 'Their property management services have made being a landlord stress-free. Highly recommend!',
            rating: 5,
            date: 'February 2023',
            avatarUrl: 'https://cdn-icons-png.flaticon.com/512/147/147144.png'
          }
        ],
      featuredListings: [
        {
          title: 'Luxury Villa in Miami',
          image: "https://a0.muscache.com/im/pictures/8f6040cb-1f5a-4c86-9bd8-73955b289d3d.jpg?im_w=480&im_format=avif 1x",
          status: 'For Sale',
          type: 'Villa',
          location: 'Miami, FL',
          price: 1250000,
          bedrooms: 4,
          bathrooms: 3,
          size: 3200
        },
        {
          title: 'Modern Condo in Los Angeles',
          image: "https://a0.muscache.com/im/pictures/f3dad936-d062-47ce-879e-03ce583dc10a.jpg?im_w=1200&im_format=avif 1x",
          status: 'For Sale',
          type: 'Condo',
          location: 'Los Angeles, CA',
          price: 850000,
          bedrooms: 2,
          bathrooms: 2,
          size: 1800
        },
        {
          title: 'Luxury Penthouse in New York',
          image: "https://a0.muscache.com/im/pictures/f903d5fe-a4fa-4e96-8b10-e15a965dc5b1.jpg?im_w=720&im_format=avif",
          status: 'For Sale',
          type: 'Penthouse',
          location: 'New York, NY',
          price: 2100000,
          bedrooms: 3,
          bathrooms: 3,
          size: 4000
        }
      ],topAgents: [
          {
            name: 'Alice Johnson',
            position: 'Real Estate Agent',
            photo: 'https://cdn-icons-png.flaticon.com/512/147/147133.png'
          },
          {
            name: 'Bob Smith',
            position: 'Real Estate Agent',
            photo: 'https://cdn-icons-png.flaticon.com/512/147/147144.png'
          },
          {
            name: 'Eve Williams',
            position: 'Real Estate Agent',
            photo: 'https://cdn-icons-png.flaticon.com/512/147/147133.png'
          }
        ],
        footerText: 'Premium Real Estate Agency specializes in luxury properties across New York City, offering personalized service and expert market insights.',
        quickLinks: [
          { text: 'Home', url: '#' },
          { text: 'About Us', url: '#' },
          { text: 'Properties', url: '#' },
          { text: 'Agents', url: '#' },
          { text: 'Blog', url: '#' },
          { text: 'Contact', url: '#' }
        ]
      }
    }
  },
  methods: {
    updateAgency(updatedAgency) {
      this.agency = updatedAgency;
    }
  }
})
</script>

import React from "react";

const cardContent = [
    {
        id: 1,
        cardIcon: "/src/assets/testimonial/man.png",
        cardName: "Gopalkrishna Kalghatgi",
        cardDescription: "Thank you for your good service..One of the best operator from Karnataka.If any one is looking for either national or International package..I 'll suggest Happy Holidayz.100% satisfied.The trip to Bangkok and Pattaya was organised very well.",
        imagedisc: "Card Icon"
    },
    
    {
        id: 2,
        cardIcon: "/src/assets/testimonial/woman.png",
        cardName: "Sarmishta V",
        cardDescription: "I am so glad that I contacted Mr. Jafar. All the procedures went so smooth. He always made sure that there were no hindrances. I am very much satisfied with the service.",
        imagedisc: "Card Icon"
    },
    {
        id: 3,
        cardIcon: "/src/assets/testimonial/man.png",
        cardName: "VN bandekar",
        cardDescription: "We appreciate and thank all of you who helped us with the obtaining of the US visa. We are especially grateful to Jafar  for her prompt and outstanding services from day one. He kept monitoring things till the time of interview and even after that! That's really a dedicated service.",
        imagedisc: "Card Icon"
    },
    {
        id: 4,
        cardIcon: "/src/assets/testimonial/man.png",
        cardName: "Prashanth Ragulolla",
        cardDescription: "We have availed their services for two trips 1. Dubai and 2. Kashmir. Both the trips were arranged quite good and we were so satisfied with their services. Thank you happy holidays.",
        imagedisc: "Card Icon"
    },
    {
        id: 5,
        cardIcon: "/src/assets/testimonial/woman.png",
        cardName: "Jyoti Mahor",
        cardDescription: "We booked our Nepal tour package with Jafar sir they booked ourall hotel  ***** transport services with helicopter ticket we thanks to you sir providing allgood services & make our Nepal tour memorable.",
        imagedisc: "Card Icon"
    },
    {
        id: 6,
        cardIcon: "/src/assets/testimonial/man.png",
        cardName: "Yogesh Garag",
        cardDescription: "Happy holidays We have travel with Dubai package excellent Service provider and domestic package also Thanks Jaffer Sir organised such a tour package.",
        imagedisc: "Card Icon"
    },
]

const Testimonial: React.FC = () => {
    return (
        <section className="user_testimonail">
            <h1>Our Happy Customers !</h1>
            <div className="user_testimonal_card_par_wrapper">
                {
                    cardContent.length &&
                    cardContent.map((content) => {
                        return (
                            <div className="testimonal_card_wrapper" key={content.id}>
                                <div className="testimonal_card">
                                    <div className="testimonal_card_image_wrapper">
                                        <img src={`${content.cardIcon}`} alt={`${content.imagedisc}`} />
                                    </div>
                                    <div className="rating">⭐ ⭐ ⭐ ⭐ ⭐</div>
                                    <h6 className="testimonial_name">{content.cardName}</h6>
                                    <p className="testimonial_description">{content.cardDescription}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
}

export default Testimonial;
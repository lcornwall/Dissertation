import React, { useRef } from "react";
import logo from "../assets/logo.svg";



export default function Education() {

    const dietRef = useRef(null);
    const vitaminDRef = useRef(null);
    const lifestyleRef = useRef(null);
    const exerciseRef = useRef(null);

    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

    return (
        <div className="landingContainer">
            <div className="header">
                <h1 className="welcomeHeading"> Education</h1>
                <img src={logo} alt="logo" className="logo" />


                <br></br>
            </div>
            <div className="buttonContainer">
                    <button onClick={() => scrollToRef(dietRef)} className="scrollButton">Diet</button>
                    <button onClick={() => scrollToRef(vitaminDRef)} className="scrollButton">Vitamin D</button>
                    <button onClick={() => scrollToRef(lifestyleRef)} className="scrollButton">Lifestyle</button>
                    <button onClick={() => scrollToRef(exerciseRef)} className="scrollButton">Exercise</button>
                </div>

            <section ref={dietRef} className="dietInfo">
                <h2>Bones and Diet</h2>
                <p>
                    Bones are made of protein fibers filled in with calcium and other minerals, 
                    changing in response to our lifestyle. It's crucial to strengthen bones in 
                    the first 30 years of life to ensure sufficient calcium and mineral supply 
                    for later years. This helps reduce the risk of osteoporosis.
                </p>
                <p>
                    A bone-friendly diet and lifestyle is useful at any age to strengthen bone, 
                    or minimize age-related bone loss. Try to consume enough calcium and vitamin D, 
                    eat a healthy balanced diet including at least 5 fruits and vegetables daily, 
                    and take regular weight-bearing and muscle-strengthening exercises.
                    Additionally, eat enough protein, aim for meat, fish, dairy or plant-based alternatives (like tofu or pulses) twice a day!
                </p>

                <h3 class="underlined-heading">Calcium Sources</h3>
                    <table>
                        <tr>
                            <th>Food Item</th>
                            <th>Calcium (mg)</th>
                        </tr>
                        <tr>
                            <td>Milk, 1/3 pint (200ml)</td>
                            <td>240</td>
                        </tr>
                        <tr>
                            <td>Calcium-enriched soya/oat milk alternative (200ml)</td>
                            <td>240</td>
                        </tr>
                        <tr>
                            <td>Hard cheese, matchbox-size (30g)</td>
                            <td>240</td>
                        </tr>
                        <tr>
                            <td>Yoghurt, plain/fruit 1 pot (150g)</td>
                            <td>240</td>
                        </tr>
                        <tr>
                            <td>Sardines with bones, ½ tin (60g)</td>
                            <td>240</td>
                        </tr>
                        <tr>
                            <td>Rice pudding, ½ large tin (200g)</td>
                            <td>180</td>
                        </tr>
                        <tr>
                            <td>Tofu / soya bean curd, (60g)</td>
                            <td>180</td>
                        </tr>
                        <tr>
                            <td>Calcium fortified bread, (180mg)</td>
                            <td>180</td>
                        </tr>
                        <tr>
                            <td>Spinach, boiled, 1 serving (120g)</td>
                            <td>180</td>
                        </tr>
                        <tr>
                            <td>Figs, dried, 4</td>
                            <td>180</td>
                        </tr>
                        <tr>
                            <td>Cheese triangle (15g)</td>
                            <td>120</td>
                        </tr>
                        <tr>
                            <td>Cottage Cheese, 1 pot (100g)</td>
                            <td>120</td>
                        </tr>
                        <tr>
                            <td>Custard, 1 serving (120ml)</td>
                            <td>120</td>
                        </tr>
                        <tr>
                            <td>White bread, 2 large slices</td>
                            <td>120</td>
                        </tr>
                        <tr>
                            <td>Soya yogurt/dessert/custard (125g)</td>
                            <td>120</td>
                        </tr>
                        <tr>
                            <td>Baked beans, small tin (220g)</td>
                            <td>120</td>
                        </tr>
                        <tr>
                            <td>Fromage frais, 1 portion (50g)</td>
                            <td>60</td>
                        </tr>
                        <tr>
                            <td>Tinned salmon, ½ tin</td>
                            <td>60</td>
                        </tr>
                        <tr>
                            <td>Wholemeal bread, 2 large slices</td>
                            <td>60</td>
                        </tr>
                        <tr>
                            <td>Hummus, 1 serving (150g)</td>
                            <td>60</td>
                        </tr>
                        <tr>
                            <td>Brazil nuts or almonds (30g)</td>
                            <td>60</td>
                        </tr>
                        <tr>
                            <td>Orange, 1</td>
                            <td>60</td>
                        </tr>
                        <tr>
                            <td>Broccoli, boiled, 2 florets (85g)</td>
                            <td>40</td>
                        </tr>
                    </table>

            </section>

            <section ref={vitaminDRef} className="vitaminD">
                <h2>Vitamin D</h2>
                <p>
                    Vitamin D helps our bodies absorb calcium. It is synthesized in the skin through 
                    sunlight exposure. People with darker skin, those who cover up outside, avoid 
                    the sun, work night shifts, or are house-bound, and older adults are at risk 
                    of vitamin D deficiency. Vitamin D can be stored in the body for use throughout 
                    the year and is also available in dietary sources like oily fish, egg yolk, 
                    meal offal, and fortified foods.
                    All adults should consider taking a daily 10µg (400IU) vitamin D supplement, especially during autumn and winter.
                </p>
            </section>

            <section ref={lifestyleRef} className="lifestyleTips">
                <h2>Lifestyle Tips</h2>
                <p>
                    High alcohol intake is associated with an increased risk of osteoporosis. 
                    Smoking leads to an increase in bone loss. Being underweight or having low 
                    oestrogen levels also increases the risk of osteoporosis. It's important to 
                    maintain a healthy body weight and consider diet rich in natural oestrogens.
                </p>
            </section>

            <section ref={exerciseRef} className="exerciseForBones">
                <h2>Exercise for Bones</h2>
                <p>
                    Being physically active helps keep bones strong. Exercise should include 
                    weight-bearing activities with impact and muscle-strengthening exercises. 
                    Variety in exercises, such as dancing, running, or jogging, is beneficial 
                    for bone health. It's recommended to exercise two to three days each week, 
                    targeting legs, arms, and spine.
                </p>
            </section>

            <footer>
                <p>For more information on bone health, visit the following reputable health websites:</p>
                <ul className="no-bullets">
                    <li><a href="https://www.bda.uk.com/resource/osteoporosis-diet.html" target="_blank">British Dietetic Association: Osteoporosis Diet</a></li>
                    <li><a href="https://cks.nice.org.uk/topics/osteoporosis-prevention-of-fragility-fractures/background-information/definition/" target="_blank">NICE: Osteoporosis - Prevention of Fragility Fractures</a></li>
                    <li><a href="https://theros.org.uk/information-and-support/bone-health/exercise-for-bones/" target="_blank">Royal Osteoporosis Society: Exercise for Bones</a></li>
                    <li><a href="https://www.osteoporosis.foundation/educational-hub/material/patient-resources" target="_blank">International Osteoporosis Foundation: Patient Resources</a></li>
                    <li><a href="https://www.nhs.uk/conditions/osteoporosis/" target="_blank">NHS UK: Osteoporosis</a></li>
                </ul>
            </footer>


        </div>
    );
}

# Project Retrospective – AI Campus Assistant

## Overview
This project focused on building the AI Campus Assistant, a web-based system designed to help students get campus-related information quickly and naturally through an AI interface. The system combined a frontend, backend, database, and AI integration, while also supporting role-based functionality for management users. Overall, the project achieved its main goal of creating a working assistant that can answer campus questions, retrieve structured data, and provide a strong foundation for future improvements.

---

## What Went Well
One of the biggest successes in this project was building a complete end-to-end flow. The system was able to take a user question from the frontend, send it to the backend, classify it, retrieve the relevant data, and return a final AI-generated answer. This made the project feel like a real working product rather than just a prototype.

Another thing that went well was the architectural choice. Using a layered modular monolith worked very well for the size and scope of the project. It kept the code organized into clear areas such as API, services, repositories, domain, and infrastructure, while still being simple enough to build and debug within a short timeline. This structure also made it easier to explain the system in documentation and presentations.

The AI integration was also a strong point. Even though the AI logic had to be refined during development, the final setup was much more controlled and practical. Instead of trying to let the AI do too much, the project moved toward a structure where the backend handled data retrieval and the AI focused on classification and response generation. That made the system more stable.

In addition, the project improved significantly over time through repeated debugging and iteration. Many issues that first appeared as blockers ended up helping improve the design of the system. By the end, the project was more robust, cleaner, and more realistic as a software solution.

---

## Challenges and Difficulties
A major challenge in this project was authentication and database compatibility. The original setup created problems because it did not support the token flow needed by the backend in the way the project required. This led to a migration in the middle of development, which meant re-learning parts of the authentication flow, updating environment configuration, and changing both frontend and backend logic. This was one of the hardest parts of the project because it affected many areas at once.

Another challenge was the AI classification logic. In the beginning, the system relied on classifications that were too narrow or too detailed. That made it difficult for the repositories to fetch the correct data, because small mismatches in filters or labels caused the flow to break. Over time, this was improved by simplifying the classifier and making the backend logic more responsible for handling the data. This was an important lesson in designing AI-assisted systems: the AI should support the software logic, not replace it.

Repository and response handling were also difficult. Since the system depended on structured database queries, even small inconsistencies such as mismatched names, weak filtering, or incorrect mappings between classifier output and repository logic caused problems. These issues required careful debugging and showed how important naming consistency and clean contracts are between system layers.

---

## What I Learned
This project taught me a lot about full-stack development in a practical environment. I learned how frontend, backend, database, and AI components must work together in a coordinated way, and how even a small issue in one layer can affect the entire system.

I also learned that architecture matters a lot. Choosing the right architecture early can save time later. The layered modular monolith was a good fit because it gave the project structure and maintainability without adding the complexity of distributed systems.

Another key lesson was about AI system design. At first, it was tempting to make the AI responsible for too much, but the project showed that a better approach is to keep core business logic deterministic and let the AI handle the parts it is best at, such as language understanding and natural response generation. This made the overall system more reliable.

I also learned how important debugging and iteration are. Many of the most valuable improvements came from fixing problems, not from the first implementation. Issues with auth, routing, repository logic, and parsing all helped deepen my understanding of how production-style systems behave.

Finally, I learned the importance of adaptability. Since the project changed during development, especially around authentication and data flow, I had to adjust the design and implementation rather than staying attached to the original plan. That flexibility was essential to making progress.

---

## What Could Be Improved
If I were to continue this project, one improvement would be to make the AI pipeline more standardized and validated. Adding stricter schemas for classifier output and stronger contracts between the classifier, repositories, and responder would reduce errors and make the system easier to extend.

Another improvement would be testing. More automated tests for repositories, services, and frontend flows would make debugging faster and reduce the risk of breaking things during changes. Since a lot of issues appeared during integration, stronger testing earlier would have saved time.

The authentication flow could also be improved by finalizing it earlier in development. Because authentication touches many parts of the application, changes to it later in the process created extra complexity. In future projects, I would try to stabilize auth and environment setup earlier.

The user experience could also be improved further. Even when the backend works correctly, the frontend still needs smooth states, clear error messages, and predictable navigation. More time spent on polish would make the project feel more complete and professional.

---

## Final Reflection
Overall, this project was a very valuable experience. It was not only about building a working AI campus assistant, but also about learning how to design, integrate, debug, and improve a real software system under constraints. The project had multiple technical challenges, but overcoming them led to a much stronger final result. Most importantly, it showed how software architecture, AI integration, and practical debugging all come together in a real development process.

The final system represents both a functional product and a strong learning experience. While there are still areas that could be improved, the project successfully demonstrates problem-solving, technical growth, and the ability to turn an idea into a working application.
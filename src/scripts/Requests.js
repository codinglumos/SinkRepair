import { getRequests, deleteRequest, getPlumbers, saveCompletions } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()
    const convertRequest = (request) => {
        return `
    <li>
        ${request.description}
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
        <select class="plumbers" id="plumbers">
        <option value="">Choose</option>
        ${
            plumbers.map(
                plumber => {
                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                }
            ).join("")
        }
    </select>
    </li>`
    }

    let html = `
        <ul>
             ${requests.map(convertRequest).join("")}
        </ul>
    `

    return html
}

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
               // saveCompletions(requestId, plumberId)
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
        const completion = {
            requestId: parseInt(requestId),
            plumberId: parseInt(plumberId),
            date_completed: Date.now()

        }
            saveCompletions(completion)

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

        }
    }
)


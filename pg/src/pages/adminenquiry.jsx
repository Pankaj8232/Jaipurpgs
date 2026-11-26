
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Adminenquiry() {
  const [data, getdata] = useState([]);

  const [popup, openpopup] = useState(false);
  const [selectedEnquiry, setselectedEnquiry] = useState("");
  const [reply, setreply] = useState("");

  const [search, setsearch] = useState("");
  const [showdetails, setshowdetails] = useState(false);
  const [selecteddata, setselecteddata] = useState({});

  async function Getdata() {
    let apilink = await fetch("https://pgbackend-umber.vercel.app/enquiry");
    let data = await apilink.json();
    getdata(data);
  }

  useEffect(() => {
    Getdata();
  }, []);

  async function Deleteenquiry(id) {
    if (window.confirm("Are you sure to delete Enquiry")) {
      let apilink = await fetch(
        `https://pgbackend-umber.vercel.app/enquiryproducts/${id}`,
        {
          method: "DELETE",
        }
      );

      if (apilink.ok) {
        toast.success("Enquiry deleted successfully");
        Getdata();
        setshowdetails(false);
      } else {
        toast.error("Enquiry not deleted");
      }
    }
  }

  function Openpopup(enquiry) {
    setselectedEnquiry(enquiry._id);
    setreply("");
    openpopup(true);
  }

  async function Sendreply() {
    if (reply.length > 0) {
      let data = { reply: reply };

      let apilink = await fetch(
        `https://pgbackend-umber.vercel.app/editenquiry/${selectedEnquiry}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (apilink.ok) {
        toast.success("Reply saved successfully");
        openpopup(false);
        setreply("");
        Getdata();
      } else {
        toast.error("Reply not saved");
      }
    } else {
      toast.error("Please enter a reply");
    }
  }

  const filtereddata = data.filter((ele) =>
    ele.name.toLowerCase().includes(search.toLowerCase())
  );

  function Showdetails(ele) {
    setselecteddata(ele);
    setshowdetails(true);
    setsearch("");
  }

  return (
    <>
      <Toaster />

      <div className="adminenquiry">
        <div className="searchdivenquiry">
          <h1>Enquiries</h1>

          <div className="adminenquirysearchbox">
            <input
              type="text"
              placeholder="Search Enquiry"
              className="searchenquiry"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />

            {search.length > 0 && (
              <div className="adminenquirysearchresults">
                {filtereddata.length > 0 ? (
                  filtereddata.map((ele) => (
                    <div
                      className="adminenquirysearchresult"
                      key={ele._id}
                      onClick={() => Showdetails(ele)}
                    >
                      <p>{ele.name}</p>
                      <span>{ele.email}</span>
                    </div>
                  ))
                ) : (
                  <p className="adminenquirynotfound">Enquiry not found</p>
                )}
              </div>
            )}
          </div>
        </div>

        {showdetails && (
          <div className="enquirydetailspopup">
            <h2>Enquiry Details</h2>

            <i
              onClick={() => setshowdetails(false)}
              className="fas fa-times-circle"
            ></i>

            <p>Name: {selecteddata.name}</p>
            <p>Email: {selecteddata.email}</p>
            <p>Message: {selecteddata.message}</p>

            <button
              className="deleteenquiry"
              onClick={() => Deleteenquiry(selecteddata._id)}
            >
              Delete
            </button>

            <button
              className="replyenquiry"
              onClick={() => Openpopup(selecteddata)}
            >
              Reply
            </button>
          </div>
        )}

        <table className="adminenquirytable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
              <th>Reply</th>
            </tr>
          </thead>

          <tbody>
            {data.map(function (enquiry) {
              return (
                <tr key={enquiry._id}>
                  <td>{enquiry.name}</td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.message}</td>

                  <td>
                    <button onClick={() => Deleteenquiry(enquiry._id)}>
                      Delete
                    </button>
                  </td>

                  <td>
                    <button onClick={() => Openpopup(enquiry)}>
                      Reply
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {popup && (
          <div className="enquiryreply">
            <h2 className="enquiryreplyheading">Write Reply</h2>

            <textarea
              placeholder="Enter your reply"
              value={reply}
              onChange={(e) => setreply(e.target.value)}
            ></textarea>

            <button onClick={Sendreply} className="enquirysendreply">
              Send Reply
            </button>

            <button
              onClick={() => openpopup(false)}
              className="enquiryreplyclose"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export { Adminenquiry };

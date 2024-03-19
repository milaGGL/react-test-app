import {
  DocumentSnapshot,
  QuerySnapshot,
  collection,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";

import React, { useEffect, useState } from "react";
import db from "./firebase";

function Listener(property: any) {
  const [items, setItems] = useState<{ id: string; data: {} }[]>([]);
  let unsubscribe;
  useEffect(() => {
    const coll = collection(
      db,
      property.type === "messages" ? "messages" : "tasks"
    );
    const isFromCache = property.type === "tasks from cache";
    const query_ = query(coll, where("docId", ">", "doc10"));
    unsubscribe = onSnapshot(
      query_,
      {
        includeMetadataChanges: true,
        source: isFromCache ? "cache" : "default",
      },
      (querySnapshot: QuerySnapshot) => {
        const newItems: any[] = [];
        querySnapshot.forEach((doc: DocumentSnapshot) => {
          newItems.push({ id: doc.id, data: doc.data() });
        });
        setItems(newItems);
      }
    );
  }, []);

  return (
    <div className="Listener">
      <h6>listens to {property.type} where "key" larger than "doc10"</h6>
      {items.map((item) => (
        <div key={item.id}>${JSON.stringify(item.data)}</div>
      ))}
    </div>
  );
}

export default Listener;

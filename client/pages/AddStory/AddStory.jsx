

import { useStoriesMut } from "@hooks/stories"
import { useUser } from '@hooks/user';
import { showToast } from "@utils/sync";
import Media from "./Media";
import Select from "./Select";
import Search from "./Search";
import { useState } from "react";
import '@styles/Stories/Stories.css';

function AddStory() {
  const { data: user } = useUser('/auth');
  const { data: added, trigger, isMutating, error } = useStoriesMut();

  const handelSubmit = e => {
    e.preventDefault();
    if (!user) return;
    showToast.promise(
      trigger(e.target)
      ,null, 'Added successfully 😊'
    )
  };
  return (
    <section className="add-story-section section">
      <div className="add-story-container container">
        <form className="form grid" onSubmit={handelSubmit}>
          <input type="hidden" name="user" value={user?._id} />
          <Media />
          <Search />
          <Select />
        </form>
      </div>
    </section>
  )
}

export default AddStory
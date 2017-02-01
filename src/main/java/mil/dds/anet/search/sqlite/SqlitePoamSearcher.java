package mil.dds.anet.search.sqlite;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.skife.jdbi.v2.Handle;

import com.google.common.collect.ImmutableList;

import jersey.repackaged.com.google.common.base.Joiner;
import mil.dds.anet.beans.Poam;
import mil.dds.anet.beans.search.PoamSearchQuery;
import mil.dds.anet.database.mappers.PoamMapper;
import mil.dds.anet.search.IPoamSearcher;

public class SqlitePoamSearcher implements IPoamSearcher {

	@Override
	public List<Poam> runSearch(PoamSearchQuery query, Handle dbHandle) {
		StringBuilder sql = new StringBuilder("SELECT poams.* FROM poams");
		Map<String,Object> args = new HashMap<String,Object>();
		
		sql.append(" WHERE ");
		List<String> whereClauses = new LinkedList<String>();
		
		String text = query.getText();
		if (text != null && text.trim().length() > 0) { 
			whereClauses.add("(longName LIKE '%' || :text || '%' OR shortName LIKE '%' || :text || '%')");
			args.put("text", text);
		}
		
		if (query.getResponsibleOrgId() != null) { 
			whereClauses.add("organizationId = :orgId");
			args.put("orgId", query.getResponsibleOrgId());
		}
		
		if (query.getCategory() != null) { 
			whereClauses.add("category = :category");
			args.put("category", query.getCategory());
		}
		
		if (whereClauses.size() == 0) { return ImmutableList.of(); }
		
		sql.append(Joiner.on(" AND ").join(whereClauses));
		sql.append(" LIMIT :limit OFFSET :offset");
		
		return dbHandle.createQuery(sql.toString())
			.bindFromMap(args)
			.bind("offset", query.getPageSize() * query.getPageNum())
			.bind("limit", query.getPageSize())
			.map(new PoamMapper())
			.list();
	}
	
}
